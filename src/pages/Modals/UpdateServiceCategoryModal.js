import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import { useQuery } from "react-query";

const UpdateServiceCategoryModal = ({ props, changes, increaseChanges }) => {
  //   const [changes, increaseChanges] = useState(0);
  const {
    isLoading,
    isError,
    data: serviceCategory,
    error,
  } = useQuery(["parrrrrrrrservicecat", changes], async ({ changes }) => {
    // console.log(changes);
    let data = await axiosInstance.get("service-category/get-parent");

    return data?.data;
  });
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

  //   console.log(props);

  //SUBMIL FUNCTION
  const onSubmit = async (data) => {
    Swal.showLoading();

    let len = data?.categoryImage?.length;
    let image = "";
    if (typeof data?.categoryImage !== typeof image) {
      for (let i = 0; i < 1; ++i) {
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
    }

    if (image === "") {
      data.categoryImage = props?.categoryImage;
    } else data.categoryImage = image;

    if (data.categoryType === "parent") {
      data.parentTitle = "";
      data.parentId = null;
    }
    if (data.parentId === "") {
      data.parentTitle = "";
      data.parentId = null;
      data.categoryType = "parent";
    }

    // console.log(data);

    //SENDING DATA TO MONGO-DB DATABASE
    await axiosInstance
      .put(`service-category/update?_id=${props._id}`, data)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire(
            "Updated!",
            `You have successfully Updated the Category.`,
            "success"
          ).then(() => {
            increaseChanges(changes + 1);
          });
        } else {
          Swal.fire("Error!", `Something went wrong`, "error");
        }
        console.log(res);
      });
  };

  return (
    <div>
      <input
        type="checkbox"
        id="update-service-category-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-auto max-w-5xl">
          <div className="w-full py-6 lg:px-10 md:px-10 sm:px-2 ">
            <p className="text-sm font-bold">Update a service category</p>

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
                      required: false,
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
                    <span className="">Parent Category </span>
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
                    <option className="" label="None" value=""></option>
                  </select>
                  <span className="text-red-500 uppercase w-[360px]">
                    * Select this only if you are adding a sub-category
                  </span>
                  <span className="text-red-500 uppercase w-[360px]">
                    * Select None if you are willing to remove this from sub
                    category to parent category
                  </span>
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
                    {...register("categoryImage", { required: false })}
                  />
                  {errors.categoryImage && (
                    <label className="label">
                      <span className="text-sm text-red-500">
                        This field is required
                      </span>
                    </label>
                  )}

                  <div className="my-4">
                    <p className="btn btn-xs mb-1">Current Image</p>
                    <p className="btn btn-xs bg-red-600 border-none text-white mb-2">
                      To update the image upload new photo
                    </p>
                    <img
                      className="rounded-lg h-40"
                      src={props?.categoryImage}
                      alt=""
                    />
                  </div>
                </div>
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
                    required: false,
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

              <div className="w-full flex justify-center items-center">
                <input
                  type="submit"
                  value="Update Service Category"
                  className="btn btn-warning w-full max-w-xs rounded mt-10"
                ></input>
              </div>
            </form>
            {/* submit  */}
          </div>

          {/* modal action */}
          <div className="modal-action w-full">
            <label
              htmlFor="update-service-category-modal"
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

export default UpdateServiceCategoryModal;
