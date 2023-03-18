import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import axios from "axios";
import UpdateBlogPara from "./UpdateBlogPara";

const UpdateBlogModal = ({ props, increaseChanges, changes }) => {
  // ADDING PARA FUNC
  const [propsData, setPropsData] = useState(props);
  const [newParagraph, setNewParagraph] = useState("");
  const [newImg, setNewImg] = useState("");
  const [newImgTags, setNewImgTags] = useState("");
  const [loading, setLoading] = useState(false);

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
    setPropsData(props);
  }, [props]);

  //   ON CHANGE TITLE IT WILL UPDATE THE TITLE
  const handleParagraph = (event) => {
    setNewParagraph(event.target.value);
  };
  const handleImageTags = (event) => {
    setNewImgTags(event.target.value);
  };

  // ON CHANGE IMAGE IT WILL ADD THE IMAGE
  const handleImageChange = async (event) => {
    let imagedata = new FormData();
    imagedata.append("file", event.target.files[0]);
    // console.log(event.target.files[0]);
    setLoading(true);

    await axiosInstance
      .post("/file/upload", imagedata)
      .then((res) => {
        //console.log(res);
        if (res.status === 200) {
          setNewImg(res?.data?.url);
          Swal.fire(
            "Saved!",
            `You have successfully added the Image.`,
            "success"
          ).then(() => {
            event.target.value = null;
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setLoading(false);
  };

  const handleOnClickAddPara = () => {
    if (newParagraph != "" && newImg != "") {
      let temPropsData = propsData;
      temPropsData.blogPara.push({
        img: newImg,
        paragraph: newParagraph,
        imgTags: newImgTags,
      });

      setPropsData(temPropsData);

      setNewImg("");
      setNewImgTags("");
      setNewParagraph("");
    }
  };

  //SUBMIL FUNCTION
  const onSubmit = async (data) => {
    Swal.showLoading();

    //   ASSEMBLYING DATA
    let temData = propsData;
    temData.blogTitle = data.blogTitle;
    temData.slug = data.slug;
    data = temData;

    // console.log(data);

    // SENDING DATA TO MONGO-DB DATABASE
    await axiosInstance
      .put(`blog/update?_id=${props?._id}`, data)
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          Swal.fire(
            "Updated!",
            `You have successfully updated the Blog.`,
            "success"
          ).then(() => {
            increaseChanges(changes + 1);
          });
        } else {
          Swal.fire("Error!", `Something went wrong`, "error");
        }
        //   console.log(res.data);
      });
  };

  return (
    <div className="w-full max-w-5xl">
      <input type="checkbox" id="update-blog-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-auto max-w-5xl">
          <div className="py-6 lg:px-10 md:px-10 sm:px-2 w-full max-w-5xl">
            <p className="text-sm font-bold pt-16">Update a Blog</p>

            <form className="mt-4 text-xs" onSubmit={handleSubmit(onSubmit)}>
              {/* BLOG TITE */}
              <div className="grid lg:grid-cols-1 sm:grid-cols-1 gap-4">
                {/* Blog TITLE  */}
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="">Blog Title</span>
                  </label>
                  <input
                    type="text"
                    name="blogTitle"
                    className="input input-bordered text-xs rounded w-full "
                    {...register("blogTitle", {
                      required: true,
                      message: "This field is required",
                    })}
                  />
                  {errors.blogTitle && (
                    <label className="label">
                      <span className="-alt text-sm text-red-500">
                        This field is required
                      </span>
                    </label>
                  )}
                </div>
              </div>

              {/* Blog Slug  */}
              <div className="form-control w-full ">
                <label className="label">
                  <span className="">
                    Blog Slug {"(use dash - between each word)"}
                  </span>
                </label>
                <input
                  type="text"
                  name="slug"
                  className="input input-bordered text-xs rounded w-full "
                  {...register("slug", {
                    required: true,
                    message: "This field is required",
                  })}
                />
                {errors.slug && (
                  <label className="label">
                    <span className="-alt text-sm text-red-500">
                      This field is required
                    </span>
                  </label>
                )}
              </div>

              <p className="font-semibold  mt-16 mb-3">
                Blog Image and paragraph
              </p>

              <div className="">
                {props?.blogPara?.map((x, index) => {
                  return (
                    <UpdateBlogPara
                      key={index}
                      index={index}
                      props={x}
                      propsData={propsData}
                      setPropsData={setPropsData}
                    ></UpdateBlogPara>
                  );
                })}
              </div>

              <p className="font-semibold  mt-16 mb-3">
                Add a new Blog section to the end (Image and paragraph)
              </p>
              <div className="grid lg:grid-cols-1 sm:grid-cols-1 gap-5 border border-gray-300 rounded-lg mb-16 p-5">
                {/* --------single image ----------*/}

                {/* img file select */}
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="">Image</span>
                  </label>
                  <input
                    type="file"
                    name="img"
                    onChange={handleImageChange}
                    className="input input-bordered text-xs rounded w-full "
                  />
                </div>
                {/* paragraph */}
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="">Paragraph with the image</span>
                  </label>
                  <textarea
                    onChange={handleParagraph}
                    value={newParagraph}
                    type="text"
                    name="aboutLeft"
                    className="textarea textarea-bordered rounded text-xs h-24"
                  />
                </div>

                {/* image  tags*/}
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="">Image Tags</span>
                  </label>
                  <input
                    onChange={handleImageTags}
                    value={newImgTags}
                    type="text"
                    className="input input-bordered text-xs rounded w-full"
                  />
                </div>
                {/* add btn */}
                <p
                  onClick={handleOnClickAddPara}
                  className={
                    newImg !== "" && newParagraph !== "" && newImgTags !== ""
                      ? "btn btn-wide"
                      : "btn btn-wide btn-disabled"
                  }
                >
                  Add Para to the end
                </p>
              </div>

              {/* SUBMIT BTN */}
              <div className="w-full flex justify-center items-center">
                <input
                  type="submit"
                  value="Update Blog"
                  className="btn btn-warning w-full max-w-xs rounded mt-10"
                ></input>
              </div>
            </form>
          </div>

          {/* modal action */}
          <div className="modal-action w-full">
            <label
              htmlFor="update-blog-modal"
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

export default UpdateBlogModal;
