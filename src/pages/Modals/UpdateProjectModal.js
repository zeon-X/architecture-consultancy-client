import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import axios from "axios";
import { useQuery } from "react-query";

const UpdateProjectModal = ({ props, increaseChanges, changes }) => {
  //   console.log(props);
  const API = "04f0795ca819457ba8b6c8ec73023069";
  const [loading, setLoading] = useState(false);

  const [updatedCategory, setCategory] = useState(props?.category?._id);
  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  // category fetching.
  const {
    isLoading,
    isError,
    data: category,
    error,
  } = useQuery(["categorys"], async ({}) => {
    return await axiosInstance.get("category/get");
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
      //   props.category = props?.category?._id;
      return props;
    }, [props]),
  });

  useEffect(() => {
    props.category = props?.category?._id;
    reset(props);
  }, [props]);

  //SUBMIL FUNCTION
  const onSubmit = async (data) => {
    // console.log(data);

    Swal.showLoading();

    // IMAGE UPLOADS  ----- SINGLE
    let image = "";
    let imgData = new FormData();
    if (data.img[0]) {
      imgData.append("image", data.img[0]);
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

    // IMAGE UPLOADS -------- BEFORE
    let len = data.galleryBefore.length;
    let imageArrayBefore = [];
    for (let i = 0; i < len; ++i) {
      let formData1 = new FormData();
      formData1.append("image", data.galleryBefore[i]);
      await axios
        .post(`https://api.imgbb.com/1/upload?key=${API}`, formData1)
        .then((res) => {
          // console.log(res.data.data.img);
          if (res.data.status === 200) {
            imageArrayBefore.push(res.data.data.display_url);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // IMAGE UPLOADS -------- AFTER
    len = data.galleryAfter.length;
    let imageArrayAfter = [];
    for (let i = 0; i < len; ++i) {
      let formData2 = new FormData();
      formData2.append("image", data.galleryAfter[i]);
      await axios
        .post(`https://api.imgbb.com/1/upload?key=${API}`, formData2)
        .then((res) => {
          // console.log(res.data.data.img);
          if (res.data.status === 200) {
            imageArrayAfter.push(res.data.data.display_url);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // ASSEMBLING ALL DATA
    if (image !== "") data.img = image;
    else data.img = props?.img;
    if (imageArrayBefore.length !== 0) data.galleryBefore = imageArrayBefore;
    else data.galleryBefore = props?.galleryBefore;
    if (imageArrayAfter.length !== 0) data.galleryAfter = imageArrayAfter;
    else data.galleryAfter = props?.galleryAfter;

    // console.log(data);

    //SENDING DATA TO MONGO-DB DATABASE
    await axiosInstance
      .put(`project/update?_id=${props?._id}`, data)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire(
            "Updated!",
            `You have successfully updated the Project.`,
            "success"
          ).then(() => {
            increaseChanges(changes + 1);
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
        // console.log(res.data);
      });
  };

  return (
    <div className="">
      <input
        type="checkbox"
        id="update-project-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-auto max-w-7xl">
          <div className="w-full py-6 lg:px-10 md:px-10 sm:px-2 pt-16">
            <p className="text-sm font-bold">Update a project</p>

            <form className="mt-4 text-xs" onSubmit={handleSubmit(onSubmit)}>
              <p className="font-semibold underline uppercase">
                Basic Information
              </p>
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
                      required: false,
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
                      required: false,
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
                      required: false,
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
                      required: false,
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
                      required: false,
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
                      required: false,
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
              {/* ------------------ REVIEW AND DISCRIPTION ----------------- */}
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
              {/* -------------- IMAGES  -------------*/}
              <p className="mt-16 font-semibold underline uppercase">
                Cover Images, Gallary Images
              </p>

              <div className="p-4 border border-gray-200 my-10">
                {/* single image */}
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="">Image</span>
                  </label>
                  <input
                    type="file"
                    name="img"
                    className="input input-bordered text-xs rounded w-full "
                    {...register("img", { required: false })}
                  />
                  {errors.img && (
                    <label className="label">
                      <span className="-alt text-sm text-red-500">
                        This field is required
                      </span>
                    </label>
                  )}
                </div>
                {/* previous img display */}
                <div className="my-4">
                  <p className="btn btn-xs mb-1">Current Image</p>
                  <p className="btn btn-xs bg-red-600 border-none text-white mx-2">
                    To update the image upload all photos including new and old
                  </p>
                  <img className="w-7/12 rounded-lg" src={props?.img} alt="" />
                </div>
              </div>

              <div className="p-4 border border-gray-200 my-10">
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
                {/* previous uploaded img display */}
                <div className="my-4">
                  <p className="btn btn-xs mb-1">
                    Previously added before Image
                  </p>
                  <p className="btn btn-xs bg-red-600 border-none text-white mx-2">
                    To update the image upload all photos including new and old
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {props?.galleryBefore?.map((x, index) => {
                      return (
                        <img
                          key={index}
                          className="w-44 rounded-lg"
                          src={x}
                          alt=""
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="p-4 border border-gray-200 my-10">
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
                {/* previous uploaded img display */}
                <div className="my-4">
                  <p className="btn btn-xs mb-1">
                    Previously added before Image
                  </p>
                  <p className="btn btn-xs bg-red-600 border-none text-white mx-2">
                    To update the image upload all photos including new and old
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {props?.galleryAfter?.map((x, index) => {
                      return (
                        <img
                          key={index}
                          className="w-44 rounded-lg"
                          src={x}
                          alt=""
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* submit */}
              <div className="w-full flex justify-center items-center">
                <input
                  type="submit"
                  value="Update Project"
                  className="btn btn-warning w-full max-w-xs rounded mt-10"
                ></input>
              </div>
            </form>
            {/* submit  */}
          </div>

          {/* modal action */}
          <div className="modal-action w-full">
            <label
              htmlFor="update-project-modal"
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

export default UpdateProjectModal;
