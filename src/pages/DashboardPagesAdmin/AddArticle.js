import React, { useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import { useQuery } from "react-query";

const AddArticle = () => {
  const [loading, setLoading] = useState(false);

  const [changes, increaseChanges] = useState(0);
  const {
    isLoading,
    isError,
    data: serviceCategory,
    error,
  } = useQuery(["allparservicecat", changes], async ({ changes }) => {
    // console.log(changes);
    let data = await axiosInstance.get("service-category/get");

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

    let len = data?.articleImg?.length;
    let image = "";
    for (let i = 0; i < len; ++i) {
      let formData1 = new FormData();
      formData1.append("file", data?.articleImg[i]);
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
    data.articleImg = image;

    const temName = serviceCategory.find(
      (x) => x._id === data.articleCategoryId
    );
    data.articleCategoryTitle = temName.categoryTitle;

    console.log(data);

    //SENDING DATA TO MONGO-DB DATABASE
    // await axiosInstance.post("service-category/create", data).then((res) => {
    //   setLoading(false);
    //   if (res.status === 201) {
    //     Swal.fire(
    //       "Saved!",
    //       `You have successfully added a Service Article.`,
    //       "success"
    //     ).then(() => {
    //       resetField("articleTitle");
    //       resetField("categoryCode");

    //       resetField("articleImg");
    //       resetField("articleDiscription");

    //       resetField("articleCategoryId");
    //       resetField("categoryType");
    //     });
    //   } else {
    //     Swal.fire("Error!", `Something went wrong`, "error");
    //   }
    //   //   console.log(res.data);
    // });
  };

  if (loading === true) Swal.showLoading();

  return (
    <div className="w-full py-6 lg:px-10 md:px-10 sm:px-2 max-w-7xl mx-auto">
      <p className="text-sm font-bold">Add a Service Article</p>

      <form className="mt-4 text-xs" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
          {/* Articlename  */}
          <div className="form-control w-full ">
            <label className="label">
              <span className="">Article Title</span>
            </label>
            <input
              type="text"
              name="articleTitle"
              className="input input-bordered text-xs rounded w-full "
              {...register("articleTitle", {
                required: true,
                message: "This field is required",
              })}
            />
            {errors.articleTitle && (
              <label className="label">
                <span className="-alt text-sm text-red-500">
                  This field is required
                </span>
              </label>
            )}
          </div>

          {/* choose parent Article */}
          <div className="form-control w-full ">
            <label className="label">
              <span className="">Category</span>
            </label>
            <select
              {...register("articleCategoryId", {
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

          {/* Articleimage */}
          <div className="form-control w-full ">
            <label className="label">
              <span className="">Image</span>
            </label>
            <input
              type="file"
              name="articleImg"
              className="input input-bordered text-xs rounded w-full "
              {...register("articleImg", { required: true })}
            />
            {errors.articleImg && (
              <label className="label">
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              </label>
            )}
          </div>
        </div>
        {/* discription */}
        <div className="form-control w-full ">
          <label className="label">
            <span className="">Article Discription</span>
          </label>
          <textarea
            type="text"
            name="articleDiscription"
            className="textarea textarea-bordered rounded text-xs h-24"
            {...register("articleDiscription", {
              required: true,
            })}
          />
          {errors.articleDiscription && (
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
            value="Add Service Article"
            className="btn btn-warning w-full max-w-xs rounded mt-10"
          ></input>
        </div>
      </form>
      {/* submit  */}
    </div>
  );
};

export default AddArticle;
