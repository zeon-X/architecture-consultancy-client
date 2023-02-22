import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";

const UpdateCategoryModal = ({ props }) => {
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

  //SUBMIL FUNCTION
  const onSubmit = async (data) => {
    Swal.showLoading();

    console.log(data);

    //SENDING DATA TO MONGO-DB DATABASE
    await axiosInstance
      .put(`category/update?_id=${props._id}`, data)
      .then((res) => {
        if (res.status === 200) {
          Swal.close();
          Swal.fire(
            "Updated!",
            `You have successfully Updated the Category.`,
            "success"
          ).then(() => {
            resetField("categoryTitle");
            resetField("categoryCode");
          });
        } else {
          Swal.close();
          Swal.fire("Error!", `Something went wrong`, "error");
        }
        console.log(res);
      });
  };

  return (
    <div>
      <input
        type="checkbox"
        id="update-category-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-auto max-w-5xl">
          <div className="w-full py-6 lg:px-10 md:px-10 sm:px-2 ">
            <p className="text-sm font-bold">Update a category</p>

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
                      required: false,
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
                      required: false,
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
                  value="Update Category"
                  className="btn btn-warning w-full max-w-xs rounded mt-10"
                ></input>
              </div>
            </form>
            {/* submit  */}
          </div>

          {/* modal action */}
          <div className="modal-action w-full">
            <label
              htmlFor="update-category-modal"
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

export default UpdateCategoryModal;
