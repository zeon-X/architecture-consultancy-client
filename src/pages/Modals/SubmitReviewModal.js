import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import axios from "axios";

const SubmitReviewModal = ({ orderData, increaseChanges, changes }) => {
  const API = "04f0795ca819457ba8b6c8ec73023069";
  const userInfo = JSON.parse(localStorage.getItem("user"));
  // REACT FORM HOOKS
  const {
    register,
    resetField,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
    else data.clientImg = "";
    data.clientName = userInfo?.name;

    await axiosInstance.post(`review/create`, data).then((res) => {
      console.log(res.data);
      if (res.status === 201) {
        orderData.reviewId = res?.data?._id;
        axiosInstance
          .put(
            `order/update?_id=${orderData?._id}&userId=${userInfo?._id}`,
            orderData
          )
          .then((res) => {
            // console.log(res.data);
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
        id="submit-review-modal"
        className="modal-toggle"
      />
      <label htmlFor="submit-review-modal" className="modal cursor-pointer">
        <label className="modal-box relative py-10" htmlFor="">
          <div className="py-3 lg:px-10 md:px-10 sm:px-2  w-full">
            <p className="text-sm font-bold ">Add a Review</p>

            <form
              className="flex flex-col items-center justify-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* review */}

              <div className="form-control text-xs w-full mt-3">
                <div className="grid lg:grid-cols-1 sm:grid-cols-1 gap-2 mb-4">
                  {/* client designation */}

                  <div className="mb-6">
                    <div className="form-control w-full ">
                      <p className="text-xs mb-2">Your Designation</p>
                      <input
                        {...register("clientDesignation", {
                          required: false,
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
                    {/* ------client img-------- */}
                    <div className="form-control w-full ">
                      <label className="label">
                        <span className="">Image</span>
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
                  </div>
                </div>

                <div className="form-control w-full ">
                  <p className="text-xs mb-2">Add a Heading/Title</p>
                  <input
                    {...register("reviewTitle", {
                      required: false,
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
                    required: false,
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
                className="btn btn-wide rounded mt-10"
                name=""
                value="Submit Review"
              />
            </form>
          </div>
        </label>
      </label>
    </div>
  );
};

export default SubmitReviewModal;
