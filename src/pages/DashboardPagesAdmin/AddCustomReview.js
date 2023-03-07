import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";

const AddCustomReview = () => {
  const API = "04f0795ca819457ba8b6c8ec73023069";
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    resetField,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

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

    data.status = "accepted";

    await axiosInstance.post("review/create", data).then((res) => {
      // console.log(res.status);
      setLoading(false);
      if (res.status === 201) {
        Swal.fire("Congratulations!", `You've added a Review!`, "success").then(
          () => {
            resetField("reviewTitle");
            resetField("reviewDiscription");
            resetField("clientImg");
            resetField("clientName");
            resetField("clientDesignation");
          }
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: res?.response?.data?.message || res?.response?.data,
        });
      }
    });

    console.log(data);
    setLoading(false);
  };

  if (loading) {
    Swal.showLoading();
  }

  return (
    <div className="py-6 lg:px-10 md:px-10 sm:px-2  w-full  max-w-7xl mx-auto">
      <p className="text-sm font-bold">Add a Review</p>

      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* review */}

        <div className="form-control text-xs w-full mt-6">
          <p className="font-bold underline mb-2">Client Information</p>
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 mb-6">
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
            {/* client img */}
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
          value="Post Review"
        />
      </form>
    </div>
  );
};

export default AddCustomReview;
