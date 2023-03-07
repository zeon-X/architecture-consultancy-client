import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import { useQuery } from "react-query";

const AddAProject = () => {
  const API = "04f0795ca819457ba8b6c8ec73023069";
  const [loading, setLoading] = useState(false);

  // category fetching.
  const [changes, increaseChanges] = useState(0);
  const {
    isLoading,
    isError,
    data: category,
    error,
  } = useQuery(["categorys", changes], async () => {
    // console.log(changes);
    return await axiosInstance.get("category/get");
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
    // console.log(data);

    setLoading(true);

    // IMAGE UPLOADS  ----- SINGLE

    let len = data?.img?.length;
    let image = "";
    for (let i = 0; i < len; ++i) {
      let formData1 = new FormData();
      formData1.append("file", data?.img[i]);
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

    // IMAGE UPLOADS -------- BEFORE
    len = data?.galleryBefore?.length;
    let imageArrayBefore = [];
    for (let i = 0; i < len; ++i) {
      let formData1 = new FormData();
      formData1.append("file", data?.galleryBefore[i]);
      await axiosInstance
        .post("/file/upload", formData1)
        .then((res) => {
          //console.log(res);
          if (res.status === 200) {
            imageArrayBefore.push(res?.data?.url);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // IMAGE UPLOADS -------- after
    len = data?.galleryAfter?.length;
    let imageArrayAfter = [];
    for (let i = 0; i < len; ++i) {
      let formData1 = new FormData();
      formData1.append("file", data.galleryAfter[i]);
      await axiosInstance
        .post("/file/upload", formData1)
        .then((res) => {
          //console.log(res);
          if (res.status === 200) {
            imageArrayAfter.push(res?.data?.url);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // ASSEMBLING ALL DATA
    if (image !== "") data.img = image;
    else data.img = "";
    if (imageArrayBefore.length !== 0) data.galleryBefore = imageArrayBefore;
    else data.galleryBefore = [];
    if (imageArrayAfter.length !== 0) data.galleryAfter = imageArrayAfter;
    else data.galleryAfter = [];

    console.log(data);

    //SENDING DATA TO MONGO-DB DATABASE
    await axiosInstance.post("project/create", data).then((res) => {
      setLoading(false);
      if (res.status === 201) {
        Swal.fire(
          "Saved!",
          `You have successfully added the Item.`,
          "success"
        ).then(() => {
          resetField("title");
          resetField("aboutLeft");
          resetField("aboutRight");
          resetField("category");
          resetField("client");
          resetField("projectYear");
          resetField("location");
          resetField("designer");
          resetField("reviewId");
          resetField("img");
          resetField("galleryBefore");
          resetField("galleryAfter");
        });
      } else {
        Swal.fire("Error!", `Something went wrong`, "error");
      }
      console.log(res.data);
    });

    setLoading(false);
  };

  if (loading === true) Swal.showLoading();

  return (
    <div className="w-full py-6 lg:px-10 md:px-10 sm:px-2  max-w-7xl mx-auto">
      <p className="text-sm font-bold">Add a project</p>

      <form className="mt-4 text-xs" onSubmit={handleSubmit(onSubmit)}>
        <p className="font-semibold underline uppercase">Basic Information</p>
        {/* basic info */}
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
          {/* title */}
          <div className="form-control w-full ">
            <label className="label">
              <span className="">Project Title</span>
            </label>
            <input
              type="text"
              name="title"
              className="input input-bordered text-xs rounded w-full "
              {...register("title", {
                required: true,
                message: "This field is required",
              })}
            />
            {errors.title && (
              <label className="label">
                <span className="-alt text-sm text-red-500">
                  This field is required
                </span>
              </label>
            )}
          </div>
          {/* category----- */}
          <div className="form-control w-full ">
            <label className="label">
              <span className="">Project Category</span>
            </label>
            <select
              {...register("category", {
                required: true,
                message: "This field is required",
              })}
              className="select select-bordered"
            >
              <option disabled selected>
                Choose a category
              </option>
              {category?.data?.map((x) => {
                return (
                  <option
                    key={x?._id}
                    label={x?.categoryTitle}
                    value={x?._id}
                  ></option>
                );
              })}
            </select>
            {errors.category && (
              <label className="label">
                <span className="-alt text-sm text-red-500">
                  This field is required
                </span>
              </label>
            )}
          </div>

          {/* client */}
          <div className="form-control w-full ">
            <label className="label">
              <span className="">Client/Company Name</span>
            </label>
            <input
              type="text"
              name="client"
              className="input input-bordered text-xs rounded w-full "
              {...register("client", {
                required: true,
                message: "This field is required",
              })}
            />
            {errors.client && (
              <label className="label">
                <span className="-alt text-sm text-red-500">
                  This field is required
                </span>
              </label>
            )}
          </div>
          {/* project year */}
          <div className="form-control w-full ">
            <label className="label">
              <span className="">Project Year</span>
            </label>
            <input
              type="text"
              name="projectYear"
              className="input input-bordered text-xs rounded w-full "
              {...register("projectYear", {
                required: true,
                message: "This field is required",
              })}
            />
            {errors.projectYear && (
              <label className="label">
                <span className="-alt text-sm text-red-500">
                  This field is required
                </span>
              </label>
            )}
          </div>
          {/* location */}
          <div className="form-control w-full ">
            <label className="label">
              <span className="">Project Location</span>
            </label>
            <input
              type="text"
              name="location"
              className="input input-bordered text-xs rounded w-full "
              {...register("location", {
                required: true,
                message: "This field is required",
              })}
            />
            {errors.location && (
              <label className="label">
                <span className="-alt text-sm text-red-500">
                  This field is required
                </span>
              </label>
            )}
          </div>
          {/* designer */}
          <div className="form-control w-full ">
            <label className="label">
              <span className="">Designer</span>
            </label>
            <input
              type="text"
              name="designer"
              className="input input-bordered text-xs rounded w-full "
              {...register("designer", {
                required: true,
                message: "This field is required",
              })}
            />
            {errors.designer && (
              <label className="label">
                <span className="-alt text-sm text-red-500">
                  This field is required
                </span>
              </label>
            )}
          </div>
        </div>

        <p className="mt-16 font-semibold underline uppercase">
          Review, About and description
        </p>

        <div className="form-control w-full ">
          <label className="label">
            <span className="">Review ID</span>
          </label>
          <input
            type="text"
            name="reviewId"
            className="input input-bordered text-xs rounded w-full "
            {...register("reviewId", {
              required: false,
              message: "This field is required",
            })}
          />
          {errors.reviewId && (
            <label className="label">
              <span className="-alt text-sm text-red-500">
                This field is required
              </span>
            </label>
          )}
        </div>

        {/* About Left-Right*/}
        <div className="grid grid-cols-2 gap-5">
          <div className="form-control w-full ">
            <label className="label">
              <span className="">About Left</span>
            </label>
            <textarea
              type="text"
              name="aboutLeft"
              className="textarea textarea-bordered rounded text-xs h-24"
              {...register("aboutLeft", {
                required: false,
              })}
            />
            {errors.aboutLeft && (
              <label className="label">
                <span className="-alt text-sm text-red-500">
                  This field is required
                </span>
              </label>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="">About Right</span>
            </label>
            <textarea
              type="text"
              name="aboutRight"
              className="textarea textarea-bordered rounded text-xs h-24"
              {...register("aboutRight", {
                required: false,
              })}
            />
            {errors.aboutRight && (
              <label className="label">
                <span className="-alt text-sm text-red-500">
                  This field is required
                </span>
              </label>
            )}
          </div>
        </div>

        <p className="mt-16 font-semibold underline uppercase">
          Cover Images, Gallary Images
        </p>
        {/*---- IMAGES-----------  */}

        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5">
          {/* --------single image ----------*/}
          <div className="form-control w-full ">
            <label className="label">
              <span className="">Image</span>
            </label>
            <input
              type="file"
              name="img"
              className="input input-bordered text-xs rounded w-full "
              {...register("img", { required: true })}
            />
            {errors.img && (
              <label className="label">
                <span className="-alt text-sm text-red-500">
                  This field is required
                </span>
              </label>
            )}
          </div>
        </div>
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5">
          {/* before image */}
          <div className="form-control w-full ">
            <label className="label">
              <span className="">Before Image Gallary</span>
            </label>
            <input
              multiple
              type="file"
              name="galleryBefore"
              className="input input-bordered text-xs rounded w-full "
              {...register("galleryBefore", { required: false })}
            />
          </div>
          {/* after image */}
          <div className="form-control w-full ">
            <label className="label">
              <span className="">After Image Gallary</span>
            </label>
            <input
              multiple
              type="file"
              name="galleryAfter"
              className="input input-bordered text-xs rounded w-full "
              {...register("galleryAfter", { required: false })}
            />
          </div>
        </div>

        {/* submit */}
        <div className="w-full flex justify-center items-center">
          <input
            type="submit"
            value="Add Project"
            className="btn btn-warning w-full max-w-xs rounded mt-10"
          ></input>
        </div>
      </form>
      {/* submit  */}
    </div>
  );
};

export default AddAProject;
