import React, { useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";

const AddCategory = () => {
  const [loading, setLoading] = useState(false);

  // REACT FORM HOOKS
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //SUBMIL FUNCTION
  const onSubmit = async (data) => {
    setLoading(true);

    console.log(data);

    //SENDING DATA TO MONGO-DB DATABASE
    await axiosInstance.post("category/create", data).then((res) => {
      setLoading(false);
      if (res.status === 201) {
        Swal.fire(
          "Saved!",
          `You have successfully added the Item.`,
          "success"
        ).then(() => {
          resetField("categoryTitle");
          resetField("categoryCode");
        });
      } else {
        Swal.fire("Error!", `Something went wrong`, "error");
      }
      //   console.log(res.data);
    });
  };

  if (loading === true) Swal.showLoading();

  return (
    <div className="w-full py-6 lg:px-10 md:px-10 sm:px-2  max-w-7xl mx-auto">
      <p className="text-sm font-bold">Add a category</p>

      <form className="mt-4 text-xs" onSubmit={handleSubmit(onSubmit)}>
        {/* Name categoryCode discount */}
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
          {/* categoryname  */}
          <div className="form-control w-full ">
            <label className="label">
              <span className="">Category Name</span>
            </label>
            <input
              type="text"
              name="categoryTitle"
              className="input input-bordered text-xs rounded w-full "
              {...register("categoryTitle", {
                required: true,
                message: "This field is required",
              })}
            />
            {errors.categoryTitle && (
              <label className="label">
                <span className="-alt text-sm text-red-500">
                  This field is required
                </span>
              </label>
            )}
          </div>
          {/* category code */}
          <div className="form-control w-full ">
            <label className="label">
              <span className="">Category Code</span>
            </label>
            <input
              type="text"
              name="categoryCode"
              className="input input-bordered text-xs rounded w-full "
              {...register("categoryCode", {
                required: true,
                message: "This field is required",
              })}
            />
            {errors.categoryCode && (
              <label className="label">
                <span className="-alt text-sm text-red-500">
                  This field is required
                </span>
              </label>
            )}
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <input
            type="submit"
            value="Add Category"
            className="btn btn-warning w-full max-w-xs rounded mt-10"
          ></input>
        </div>
      </form>
      {/* submit  */}
    </div>
  );
};

export default AddCategory;
