import React, { useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import { useQuery } from "react-query";

const AddServiceCategory = () => {
  const [loading, setLoading] = useState(false);

  const [changes, increaseChanges] = useState(0);
  const {
    isLoading,
    isError,
    data: serviceCategory,
    error,
  } = useQuery(["parservicecat", changes], async ({ changes }) => {
    // console.log(changes);
    let data = await axiosInstance.get("service-category/get-parent");

    return data?.data;
  });

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

    let len = data?.categoryImage?.length;
    let image = "";
    for (let i = 0; i < len; ++i) {
      let formData1 = new FormData();
      formData1.append("file", data?.categoryImage[i]);
      await axiosInstance
        .post("/file/upload", formData1)
        .then((res) => {
          //console.log(res);
          if (res.status === 200) {
            image = res?.data?.url;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    //ASYMBLING DATA
    data.parentTitle = "";
    data.categoryImage = image;

    if (data.categoryType === "parent") {
      data.parentId = null;
    } else {
      const temName = serviceCategory.find((x) => x._id === data.parentId);
      data.parentTitle = temName.categoryTitle;
    }

    console.log(data);

    //SENDING DATA TO MONGO-DB DATABASE
    await axiosInstance.post("service-category/create", data).then((res) => {
      setLoading(false);
      if (res.status === 201) {
        Swal.fire(
          "Saved!",
          `You have successfully added a Service Category.`,
          "success"
        ).then(() => {
          resetField("categoryTitle");
          resetField("categoryCode");

          resetField("categoryImage");
          resetField("categoryDiscription");

          resetField("parentId");
          resetField("categoryType");
        });
      } else {
        Swal.fire("Error!", `Something went wrong`, "error");
      }
      //   console.log(res.data);
    });
  };

  if (loading === true) Swal.showLoading();

  return (
    <div className="w-full py-6 lg:px-10 md:px-10 sm:px-2 max-w-7xl mx-auto">
      <p className="text-sm font-bold">Add a Service category</p>

      <form className="mt-4 text-xs" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
          {/* categoryname  */}
          <div className="form-control w-full ">
            <label className="label">
              <span className="">Category Title</span>
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
              <span className="">Article Id</span>
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
          {/* category type */}
          <div className="form-control w-full ">
            <label className="label">
              <span className="">Category Type</span>
            </label>
            <select
              {...register("categoryType", {
                required: true,
                message: "This field is required",
              })}
              className="select select-bordered"
            >
              <option disabled selected>
                Choose Category Type
              </option>
              <option label="Parent" value="parent"></option>
              <option label="Sub" value="sub"></option>
            </select>
            {errors.categoryType && (
              <label className="label">
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              </label>
            )}
          </div>
          {/* choose parent category */}
          <div className="form-control w-full ">
            <label className="label">
              <span className="">
                Parent Category{" "}
                <span className="text-red-500 uppercase">
                  (Select this only if you are adding a sub-category*)
                </span>
              </span>
            </label>
            <select
              {...register("parentId", {
                required: false,
                message: "This field is required",
              })}
              className="select select-bordered"
            >
              <option disabled selected>
                Choose a category
              </option>
              {serviceCategory?.map((x) => {
                return (
                  <option
                    key={x?._id}
                    label={x?.categoryTitle}
                    value={x?._id}
                  ></option>
                );
              })}
            </select>
          </div>
          {/* discription */}
          <div className="form-control w-full ">
            <label className="label">
              <span className="">Category Discription</span>
            </label>
            <textarea
              type="text"
              name="categoryDiscription"
              className="textarea textarea-bordered rounded text-xs h-24"
              {...register("categoryDiscription", {
                required: true,
              })}
            />
            {errors.categoryDiscription && (
              <label className="label">
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              </label>
            )}
          </div>
          {/* categoryimage */}
          <div className="form-control w-full ">
            <label className="label">
              <span className="">Image</span>
            </label>
            <input
              type="file"
              name="categoryImage"
              className="input input-bordered text-xs rounded w-full "
              {...register("categoryImage", { required: true })}
            />
            {errors.categoryImage && (
              <label className="label">
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              </label>
            )}
          </div>
        </div>

        <div className="w-full flex justify-center items-center">
          <input
            type="submit"
            value="Add Service Category"
            className="btn btn-warning w-full max-w-xs rounded mt-10"
          ></input>
        </div>
      </form>
      {/* submit  */}
    </div>
  );
};

export default AddServiceCategory;
