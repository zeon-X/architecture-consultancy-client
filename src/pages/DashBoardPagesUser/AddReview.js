import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../shared/Loading";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";

const AddReview = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const location = useLocation();
  // const userdata = JSON.parse(location.search.split("=")[1]);
  // console.log(location);
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("user")));
  }, []);
  const userdata = {};

  const {
    register,
    resetField,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.userId = userInfo?._id;
    data.email = userInfo?.email;
    setLoading(true);
    axiosInstance.post("review/create", data).then((res) => {
      // console.log(res.status);
      setLoading(false);
      if (res.status === 201) {
        Swal.fire("Congratulations!", `You've added a Review!`, "success").then(
          () => {
            navigate("/dashboard/my-account");
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

    // setLoading(false);

    // console.log(data);
  };

  if (loading) {
    Swal.showLoading();
  }

  return (
    <div className="py-6 lg:px-10 md:px-10 sm:px-2  w-full">
      <p className="text-sm font-bold">Add a Review</p>

      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* address */}
        <div className="form-control text-xs w-full mt-6">
          <div className="form-control w-full max-w-xs">
            <p className="text-xs mb-2">
              Rate your experience on a scale (1-5)
            </p>
            <input
              {...register("rating", {
                required: true,
                min: 1,
                max: 5,
              })}
              type="number"
              placeholder="Type here"
              className="input input-bordered text-xs w-full max-w-xs rounded-none"
            />
            <label className="label">
              {errors.rating && (
                <span className="label-text-alt text-sm text-red-500">
                  This field is required. Put a value between 1-5
                </span>
              )}
            </label>
          </div>
          <p className="font-bold underline mb-2">Your Comment</p>
          <textarea
            {...register("comment", {
              required: true,
            })}
            className="textarea textarea-bordered h-24 text-xs rounded-none"
            placeholder="Type Here"
          ></textarea>
          <label className="label">
            {errors.comment && (
              <span className="label-text-alt text-sm text-red-500">
                This field is required
              </span>
            )}
          </label>
        </div>

        <input
          type="submit"
          className="btn btn-warning w-full max-w-xs rounded-none mt-10"
          name=""
          value="Submit Review"
        />
      </form>
    </div>
  );
};

export default AddReview;
