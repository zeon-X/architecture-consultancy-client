import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import p from "../../assets/object/person.webp";
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
  const { slug } = useParams();

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
  } = useQuery(["blogDetailsdata", slug], async ({}) => {
    let data = await axiosInstance.get(`blog/find-by-slug?slug=${slug}`);
    let tem = data?.data[0];
    return tem;
  });

  console.log(blogDetails);
  const [_id, setId] = useState(null);
  useEffect(() => {
    setId(blogDetails?._id);
    increaseChanges(changes + 1);
  }, [blogDetails]);

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
    <motion.div
      initial={{
        x: -100,
        opasity: 0,
        visibility: "hidden",
      }}
      animate={{
        x: 0,
        opacity: 1,
        visibility: "visible",
        transition: {
          type: "spring",
          delay: 0.75,
          duration: 0.75,
          bounce: 0.1,
        },
      }}
      className="sm:px-8 py-10 w-full max-w-7xl mx-auto flex flex-col justify-center items-center"
    >
      {/* BLOG HEADING */}
      <div className=" mb-16 flex lg:flex-row sm:flex-col justify-between lg:items-center sm:items-start w-full">
        <p className="text-4xl font-bold lg:w-9/12 sm:w-full">
          {blogDetails?.blogTitle}
        </p>
        <p className="lg:w-3/12 sm:w-full text-sm">
          Update At: {blogDetails?.updatedAt.split("T")[0]} Time:{" "}
          {blogDetails?.updatedAt.split("T")[1].split(".")[0]}
        </p>
      </div>

      {/* BLOG DETAILS */}
      {blogDetails?.blogPara?.map((x, index) => {
        return (
          <div key={index}>
            {x?.img !== "" && (
              <div
                className={
                  index === 0
                    ? "w-full h-full "
                    : "h-full lg:w-6/12 md:w-8/12 sm:w-full mx-auto"
                }
              >
                {x?.img?.includes("https") ? (
                  <img src={x?.img} alt={x?.imgTags} />
                ) : (
                  <div className="w-full h-full flex justify-center items-center">
                    <iframe
                      className="w-full lg:h-[480px] md:h-[480px] sm:h-[280px] rounded-xl"
                      // width="560"
                      // height="315"
                      src={`https://www.youtube.com/embed/${x?.img}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>
            )}

            <p
              className="my-16 text-lg text-gray-500"
              dangerouslySetInnerHTML={{
                __html: x?.paragraph,
              }}
            ></p>
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
              quote={blogDetails?.blogTitle}
              description={blogDetails?.blogPara[0]?.paragraph}
              className="Demo__some-network__share-button"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>

            <LinkedinShareButton
              url={window.location.href}
              quote={blogDetails?.blogTitle}
              description={blogDetails?.blogPara[0]?.paragraph}
              className="Demo__some-network__share-button"
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>

            <PinterestShareButton
              url={window.location.href}
              quote={blogDetails?.blogTitle}
              description={blogDetails?.blogPara[0]?.paragraph}
              className="Demo__some-network__share-button"
            >
              <PinterestIcon size={32} round />
            </PinterestShareButton>

            <TwitterShareButton
              url={window.location.href}
              quote={blogDetails?.blogTitle}
              description={blogDetails?.blogPara[0]?.paragraph}
              className="Demo__some-network__share-button"
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>

            <WhatsappShareButton
              url={window.location.href}
              quote={blogDetails?.blogTitle}
              description={blogDetails?.blogPara[0]?.paragraph}
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
                  <img className="w-20 h-20" src={p} alt="" />
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
    </motion.div>
  );
};

export default BlogDetails;
