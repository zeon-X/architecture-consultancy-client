import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const BlogDetails = () => {
  const [changes, increaseChanges] = useState(0);
  const { _id } = useParams();
  //   console.log(_id);

  // console.log(window.location.href);

  // REACT FORM HOOKS
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // BLOG DETAILS FETCHING
  const {
    isLoading,
    isError,
    data: blogDetails,
    error,
  } = useQuery(["blogDetailsdata"], async ({}) => {
    let data = await axiosInstance.get(`blog/find?_id=${_id}`);

    return data;
  });

  // COMMENT DATA FETCHING
  const {
    isLoading1,
    isError1,
    data: commentsData,
    error1,
  } = useQuery(["commentsData", changes], async ({ changes }) => {
    // console.log(changes);
    let data = await axiosInstance.get(`comment/get-by-blog?_id=${_id}`);

    return data;
  });

  // console.log(commentsData);

  //SUBMIL COMMENT FUNCTION
  const onSubmit = async (data) => {
    Swal.showLoading();

    // ASYMBLYING DATA
    data.blogId = _id;
    // console.log(data);

    //SENDING DATA TO MONGO-DB DATABASE
    await axiosInstance.post("comment/create", data).then((res) => {
      if (res.status === 201) {
        Swal.fire(
          "Saved!",
          `You have successfully added the Comment.`,
          "success"
        ).then(() => {
          increaseChanges(changes + 1);
          resetField("name");
          resetField("email");
          resetField("comment");
        });
      } else {
        Swal.fire("Error!", `Something went wrong`, "error");
      }
    });
  };

  return (
    <div className="lg:px-20 sm:px-8 py-10 w-full max-w-7xl mx-auto flex flex-col justify-center items-center">
      {/* BLOG HEADING */}
      <div className=" mb-16 flex lg:flex-row sm:flex-col justify-between lg:items-center sm:items-start w-full">
        <p className="text-4xl font-bold lg:w-9/12 sm:w-full">
          {blogDetails?.data?.blogTitle}
        </p>
        <p className="lg:w-3/12 sm:w-full text-sm">
          Update At: {blogDetails?.data?.updatedAt.split("T")[0]} Time:{" "}
          {blogDetails?.data?.updatedAt.split("T")[1].split(".")[0]}
        </p>
      </div>

      {/* BLOG DETAILS */}
      {blogDetails?.data?.blogPara?.map((x, index) => {
        return (
          <div key={index}>
            <img className="w-full rounded-xl" src={x?.img} alt="" />
            <p className="my-16 text-lg text-gray-500">{x?.paragraph}</p>
          </div>
        );
      })}

      {/* CREATED BY ADMIN */}
      <div className="bg-gray-200 p-12 flex lg:flex-row sm:flex-col justify-between gap-6 w-full ">
        <div>
          <p className="uppercase tracking-widest text-sm">created by</p>
          <p className="text-lg text-gray-400 font-semibold tracking-widest mt-4">
            admin
          </p>
        </div>
        <div>
          <p className="uppercase tracking-widest text-sm">share to</p>
          {/* SHARE BTNS */}
          <div className="flex gap-2 mt-4 text-lg text-gray-400">
            <FacebookShareButton
              url={window.location.href}
              quote={blogDetails?.data?.blogTitle}
              description={blogDetails?.data?.blogPara[0]?.paragraph}
              className="Demo__some-network__share-button"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>

            <LinkedinShareButton
              url={window.location.href}
              quote={blogDetails?.data?.blogTitle}
              description={blogDetails?.data?.blogPara[0]?.paragraph}
              className="Demo__some-network__share-button"
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>

            <PinterestShareButton
              url={window.location.href}
              quote={blogDetails?.data?.blogTitle}
              description={blogDetails?.data?.blogPara[0]?.paragraph}
              className="Demo__some-network__share-button"
            >
              <PinterestIcon size={32} round />
            </PinterestShareButton>

            <TwitterShareButton
              url={window.location.href}
              quote={blogDetails?.data?.blogTitle}
              description={blogDetails?.data?.blogPara[0]?.paragraph}
              className="Demo__some-network__share-button"
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>

            <WhatsappShareButton
              url={window.location.href}
              quote={blogDetails?.data?.blogTitle}
              description={blogDetails?.data?.blogPara[0]?.paragraph}
              className="Demo__some-network__share-button"
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>
        </div>
      </div>

      {/* !!!!!!!--------- COMMENTS-----------!!!!!!!!! */}
      <div className="w-full mt-16 mb-28">
        <p className="tracking-widest">COMMENTS</p>
        <p className="text-5xl font-semibold mt-4 mb-12">
          Just say Your opinion.
        </p>

        <div className="flex lg:flex-row sm:flex-col gap-10">
          {/* ---------COMMENTS ABOUT THIS BLOG ---------*/}
          <div className="lg:w-7/12 sm:w-full ">
            <p className="tracking-widest mb-6 underline">
              COMMENT ABOUT THIS BLOG
            </p>
            {commentsData?.data?.map((x) => {
              return (
                <div className="w-full flex p-8 gap-6 bg-gray-100 rounded-xl justify-center items-center mb-6">
                  <img
                    className="w-20 h-20"
                    src="https://cdn-icons-png.flaticon.com/512/727/727399.png"
                    alt=""
                  />
                  <div className="w-full">
                    <div className="flex justify-between items-center w-full">
                      <p className="text-lg font-semibold">{x?.name}</p>
                      <p className="text-sm">
                        Commented at: {x?.createdAt.split("T")[0]}
                      </p>
                    </div>
                    <p className="mt-6">{x?.comment}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {/*--------- MAKE A COMMENT------------ */}
          <form
            className="lg:w-5/12 sm:w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="tracking-widest mb-6 underline">YOUR COMMENT</p>
            {/* COMMENT BOX */}
            <textarea
              placeholder="Comment"
              type="text"
              name="comment"
              className="textarea textarea-bordered px-6 py-8 w-full"
              {...register("comment", {
                required: true,
              })}
            ></textarea>
            {errors.comment && (
              <label className="label">
                <span className="-alt text-sm text-red-500">
                  This field is required
                </span>
              </label>
            )}

            {/* NAME BOX */}
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input input-bordered  rounded px-6 py-8 w-full my-4"
              {...register("name", {
                required: true,
                message: "This field is required",
              })}
            />
            {errors.name && (
              <label className="label">
                <span className="-alt text-sm text-red-500">
                  This field is required
                </span>
              </label>
            )}
            {/* EMAIL BOX */}
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="input input-bordered  rounded  px-6 py-8 w-full"
              {...register("email", {
                required: true,
                message: "This field is required",
              })}
            />
            {errors.email && (
              <label className="label">
                <span className="-alt text-sm text-red-500">
                  This field is required
                </span>
              </label>
            )}
            {/* SUBMIT BTN */}
            <input
              type="submit"
              value="Leave a Comment"
              className="btn w-full  rounded mt-10"
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
