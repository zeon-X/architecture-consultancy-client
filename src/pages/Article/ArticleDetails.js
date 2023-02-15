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
import ShowProjects from "../Project/ShowProjects";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ArticleDetails = () => {
  const { _id } = useParams();
  //   console.log(_id);
  // REACT FORM HOOKS
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ARTICLE DETAILS FETCHING
  const {
    isLoading,
    isError,
    data: articleDetails,
    error,
  } = useQuery(["articleDetailsdata"], async ({}) => {
    let data = await axiosInstance.get(`article/find?_id=${_id}`);

    return data;
  });

  const {
    isLoading1,
    isError1,
    data: project,
    error1,
  } = useQuery(["catname"], async () => {
    let api = "";
    api = `project/get-active?limit=3`;
    let fdata = await axiosInstance.get(api);
    // console.log(fdata);
    return fdata;
  });

  const { ref, inView } = useInView();
  const animation = useAnimation();
  // const animatio1 = useAnimation();
  useEffect(() => {
    if (inView) {
      animation.start({
        x: 0,
        opasity: 1,
        visibility: "visible",
      });
    }
  }, [inView]);

  return (
    <div className="sm:px-8 py-10 w-full max-w-7xl mx-auto flex flex-col justify-center items-center">
      {/* ARTICLE HEADING */}
      <div className=" mb-16 flex lg:flex-row sm:flex-col justify-between lg:items-center sm:items-start w-full">
        <p className="text-4xl font-bold w-full">
          {articleDetails?.data?.articleTitle}
        </p>

        {/* <p className=" text-sm">
          Update At: {articleDetails?.data?.updatedAt.split("T")[0]} Time:{" "}
          {articleDetails?.data?.updatedAt.split("T")[1].split(".")[0]}
        </p> */}
      </div>

      {/* ARTICLE DETAILS */}
      <div className="flex flex-col gap-6">
        {articleDetails?.data?.articlePara?.map((x, index) => {
          return (
            <div key={index}>
              {index % 2 === 0 ? (
                <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6">
                  <img className="w-full rounded-xl" src={x?.img} alt="" />
                  <p
                    className="my-16 text-lg text-gray-500"
                    dangerouslySetInnerHTML={{ __html: x?.paragraph }}
                  ></p>
                </div>
              ) : (
                <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6">
                  <p
                    className="my-16 text-lg text-gray-500 lg:order-1 md:order-2 sm:order-2"
                    dangerouslySetInnerHTML={{ __html: x?.paragraph }}
                  ></p>
                  <img
                    className="w-full rounded-xl  lg:order-2 md:order-1 sm:order-1"
                    src={x?.img}
                    alt=""
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CREATED BY ADMIN */}
      <div className="bg-gray-200 p-12 flex lg:flex-row sm:flex-col justify-between gap-6 w-full mt-20">
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
              quote={articleDetails?.data?.articleTitle}
              description={articleDetails?.data?.articlePara[0]?.paragraph}
              className="Demo__some-network__share-button"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>

            <LinkedinShareButton
              url={window.location.href}
              quote={articleDetails?.data?.articleTitle}
              description={articleDetails?.data?.articlePara[0]?.paragraph}
              className="Demo__some-network__share-button"
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>

            <PinterestShareButton
              url={window.location.href}
              quote={articleDetails?.data?.articleTitle}
              description={articleDetails?.data?.articlePara[0]?.paragraph}
              className="Demo__some-network__share-button"
            >
              <PinterestIcon size={32} round />
            </PinterestShareButton>

            <TwitterShareButton
              url={window.location.href}
              quote={articleDetails?.data?.articleTitle}
              description={articleDetails?.data?.articlePara[0]?.paragraph}
              className="Demo__some-network__share-button"
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>

            <WhatsappShareButton
              url={window.location.href}
              quote={articleDetails?.data?.articleTitle}
              description={articleDetails?.data?.articlePara[0]?.paragraph}
              className="Demo__some-network__share-button"
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>
        </div>
      </div>

      {/* PROJECTS */}
      {project?.length !== 0 && (
        <div
          ref={ref}
          className="max-w-7xl mx-auto px-4 mt-16 flex flex-col justify-center items-center"
        >
          <p className="text-3xl uppercase font-semibold ">related projects</p>
          <ShowProjects
            ref={ref}
            inView={inView}
            project={project}
          ></ShowProjects>
        </div>
      )}
    </div>
  );
};

export default ArticleDetails;
