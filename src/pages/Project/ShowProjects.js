import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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
import { useAnimation, motion } from "framer-motion";

const ShowProjects = ({ project, ref, inView }) => {
  const navigate = useNavigate();

  // console.log(project);

  // const { ref, inView } = useInView();
  const animation = useAnimation();
  useEffect(() => {
    if (inView) {
      animation.start({
        x: 0,
        opasity: 1,
        transition: {
          type: "spring",
          delay: 0.75,
          duration: 0.8,
          bounce: 0.1,
        },
      });
    }
  }, [inView]);

  return (
    <motion.div
      initial={{
        x: "-100vw",
        opasity: 0,
      }}
      animate={animation}
      ref={ref}
      // animate={{
      //   y: 0,
      //   opasity: 1,
      //   visibility: "visible",
      //   transition: {
      //     type: "spring",
      //     delay: 0.5,
      //     duration: 0.75,
      //     bounce: 0.3,
      //   },
      // }}
    >
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-center items-center gap-5 my-10 max-w-7xl mx-auto ">
        {project?.data?.map((x, index) => {
          return (
            <div
              key={index}
              className="border border-gray-100 bg-white shadow-lg  h-full"
            >
              <div
                className="   relative h-[250px] w-full bg-cover bg-center hover:bg-auto shadow-lg "
                style={{
                  backgroundImage: `url(${x?.img})`,
                }}
              >
                <p className="uppercase absolute top-0 right-0 bg-white text-sm font-semibold p-2">
                  {x?.category?.categoryTitle}
                </p>
              </div>
              <div className="my-2 p-6">
                <p className=" text-lg font-semibold ">
                  {x?.title?.slice(0, 35)}
                </p>
                <p className="text-sm ">Location: {x?.location}</p>
                <p className="text-sm mt-5 mb-8 text-gray-500">
                  {x?.aboutLeft?.slice(0, 140)}..
                </p>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => {
                      navigate(
                        `/project-details/${x?._id}/${x?.category?._id}`
                      );
                    }}
                    className="flex items-center gap-2 text-sm uppercase mt-4 hover:text-red-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                    Read More
                  </button>
                  <div className="flex gap-2  text-lg text-gray-400">
                    <FacebookShareButton
                      url={`http://imranscreation.com/project-details/${x?._id}/${x?.category?._id}`}
                      quote={x?.title}
                      description={x?.aboutLeft?.slice(0, 90)}
                      className="Demo__some-network__share-button"
                    >
                      <FacebookIcon size={26} round />
                    </FacebookShareButton>

                    <LinkedinShareButton
                      url={`http://imranscreation.com/project-details/${x?._id}/${x?.category?._id}`}
                      quote={x?.title}
                      description={x?.aboutLeft?.slice(0, 90)}
                      className="Demo__some-network__share-button"
                    >
                      <LinkedinIcon size={26} round />
                    </LinkedinShareButton>

                    <PinterestShareButton
                      url={`http://imranscreation.com/project-details/${x?._id}/${x?.category?._id}`}
                      quote={x?.title}
                      description={x?.aboutLeft?.slice(0, 90)}
                      className="Demo__some-network__share-button"
                    >
                      <PinterestIcon size={26} round />
                    </PinterestShareButton>

                    <TwitterShareButton
                      url={`http://imranscreation.com/project-details/${x?._id}/${x?.category?._id}`}
                      quote={x?.title}
                      description={x?.aboutLeft?.slice(0, 90)}
                      className="Demo__some-network__share-button"
                    >
                      <TwitterIcon size={26} round />
                    </TwitterShareButton>

                    <WhatsappShareButton
                      url={`http://imranscreation.com/project-details/${x?._id}/${x?.category?._id}`}
                      quote={x?.title}
                      description={x?.aboutLeft?.slice(0, 90)}
                      className="Demo__some-network__share-button"
                    >
                      <WhatsappIcon size={26} round />
                    </WhatsappShareButton>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ShowProjects;