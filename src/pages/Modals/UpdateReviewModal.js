import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import axios from "axios";

const UpdateReviewModal = ({ props, increaseChanges, changes }) => {
  const API = "04f0795ca819457ba8b6c8ec73023069";
  // REACT FORM HOOKS
  const {
    register,
    resetField,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return props;
    }, [props]),
  });

  useEffect(() => {
    reset(props);
  }, [props]);

  const onSubmit = async (data) => {
    Swal.showLoading();

    // IMAGE UPLOADS  ----- SINGLE
    let image = "";
    let imgData = new FormData();
    // console.log(data.clientImg);
    if (data.clientImg[0]) {
      imgData.append("image", data.clientImg[0]);
      await axios
        .post(`https://api.imgbb.com/1/upload?key=${API}`, imgData)
        .then((res) => {
          if (res.data.status === 200) {
            image = res.data.data.display_url;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // Data assembling-----------------
    if (image !== "") data.clientImg = image;
    else data.clientImg = props?.clientImg;

    await axiosInstance
      .put(`review/update?_id=${props?._id}`, data)
      .then((res) => {
        // console.log(res.status);

        if (res.status === 200) {
          Swal.fire(
            "Congratulations!",
            `You've added a Review!`,
            "success"
          ).then(() => {
            increaseChanges(changes + 1);
            resetField("reviewTitle");
            resetField("reviewDiscription");
            resetField("clientImg");
            resetField("clientName");
            resetField("clientDesignation");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: res?.response?.data?.message || res?.response?.data,
          });
        }
      });

    console.log(data);
  };

  return (
    <div>
      <input
        type="checkbox"
        id="update-review-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-auto max-w-5xl">
          <div className="py-6 lg:px-10 md:px-10 sm:px-2  w-full">
            <p className="text-sm font-bold pt-16">Update a Review</p>

            <form
              className="flex flex-col items-center justify-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* review */}

              <div className="form-control text-xs w-full mt-6">
                <p className="font-bold underline mb-2">Client Information</p>
                <div className="grid lg:grid-cols-1 sm:grid-cols-1 gap-4 mb-6">
                  {/* client name */}
                  <div className="form-control w-full ">
                    <p className="text-xs mb-2">Client Name</p>
                    <input
                      {...register("clientName", {
                        required: true,
                      })}
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered text-xs w-full  rounded"
                    />
                    <label className="label">
                      {errors.clientName && (
                        <span className="label-text-alt text-sm text-red-500">
                          This field is required.
                        </span>
                      )}
                    </label>
                  </div>
                  {/* client designation */}
                  <div className="form-control w-full ">
                    <p className="text-xs mb-2">Client Designation</p>
                    <input
                      {...register("clientDesignation", {
                        required: true,
                      })}
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered text-xs w-full  rounded"
                    />
                    <label className="label">
                      {errors.clientDesignation && (
                        <span className="label-text-alt text-sm text-red-500">
                          This field is required.
                        </span>
                      )}
                    </label>
                  </div>
                  <div className="p-4 border border-gray-200 my-10">
                    {/* ------client img-------- */}
                    <div className="form-control w-full ">
                      <label className="label">
                        <span className="">Client Image</span>
                      </label>
                      <input
                        type="file"
                        name="clientImg"
                        className="input input-bordered text-xs rounded w-full "
                        {...register("clientImg", { required: false })}
                      />
                      {errors.clientImg && (
                        <label className="label">
                          <span className="-alt text-sm text-red-500">
                            This field is required
                          </span>
                        </label>
                      )}
                    </div>

                    <div className="my-4">
                      <p className="btn btn-xs mb-1">Current Image</p>
                      <p className="btn btn-xs bg-red-600 border-none text-white mx-2">
                        To update the image upload all photos including new and
                        old
                      </p>
                      <img
                        className="w-7/12 rounded-lg"
                        src={props?.clientImg}
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                <p className="font-bold underline mb-2">Review Section</p>
                <div className="form-control w-full ">
                  <p className="text-xs mb-2">Add a Heading/Title</p>
                  <input
                    {...register("reviewTitle", {
                      required: true,
                    })}
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered text-xs w-full  rounded"
                  />
                  <label className="label">
                    {errors.reviewTitle && (
                      <span className="label-text-alt text-sm text-red-500">
                        This field is required.
                      </span>
                    )}
                  </label>
                </div>
                <p className="text-xs mb-2">Review</p>
                <textarea
                  {...register("reviewDiscription", {
                    required: true,
                  })}
                  className="textarea textarea-bordered h-24 text-xs rounded"
                  placeholder="Type Here"
                ></textarea>
                <label className="label">
                  {errors.reviewDiscription && (
                    <span className="label-text-alt text-sm text-red-500">
                      This field is required
                    </span>
                  )}
                </label>
              </div>

              <input
                type="submit"
                className="btn btn-wide btn-warning  rounded mt-10"
                name=""
                value="Update Review"
              />
            </form>
          </div>

          {/* modal action */}
          <div className="modal-action w-full">
            <label
              htmlFor="update-review-modal"
              className="btn btn-xs mx-auto bg-red-600 text-white border-none"
            >
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateReviewModal;
