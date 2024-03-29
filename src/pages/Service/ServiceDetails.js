import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import { useParams } from "react-router-dom";
import ShowProjects from "../Project/ShowProjects";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ServiceDetails = () => {
  const { slug } = useParams();
  // console.log(slug);

  // ARTICLE DETAILS FETCHING
  const {
    isLoading,
    isError,
    data: serviceData,
    error,
  } = useQuery(["serviceDataDetails", slug], async ({}) => {
    let data = await axiosInstance.get(`article/find-by-slug?slug=${slug}`);
    let tem = data?.data[0];
    return tem;
  });

  console.log(serviceData);

  const {
    isLoading1,
    isError1,
    data: project,
    error1,
  } = useQuery(["relatedProjectsForServicePage", serviceData], async () => {
    let api = "";
    api = `project/find-by-cat-basic?_catId=${serviceData?.categoryId}&limit=3`;
    let fdata = await axiosInstance.get(api);
    // console.log(fdata);
    return fdata;
  });

  const { ref, inView } = useInView();
  const animation1 = useAnimation();
  useEffect(() => {
    if (inView) {
      animation1.start({
        x: 0,
        opasity: 1,
        visibility: "visible",
        transition: {
          type: "spring",
          delay: 0.3,
          duration: 0.75,
          bounce: 0.1,
        },
      });
    }
  }, [inView]);

  return (
    <div className="sm:px-8 py-10 w-full max-w-6xl mx-auto flex flex-col justify-center items-center">
      {/* ARTICLE HEADING */}

      <p className="text-4xl font-bold w-full mb-16 mt-6">
        {serviceData?.articleTitle}
      </p>

      {/* ARTICLE DETAILS */}
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
        className="flex flex-col gap-6 min-h-screen"
      >
        {serviceData?.articlePara?.map((x, index) => {
          return (
            <div key={index}>
              {index % 2 === 0 ? (
                <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6">
                  {x?.img !== "" && (
                    <div className="w-full h-full">
                      {x?.img?.includes("http") ? (
                        <img
                          className="w-full rounded-xl"
                          src={x?.img}
                          alt={x?.imgTags}
                        />
                      ) : (
                        <div className="w-full h-full flex justify-center items-center">
                          <iframe
                            className="w-full lg:h-full md:h-[480px] sm:h-[280px] rounded-xl"
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
                    className=" text-lg text-black"
                    dangerouslySetInnerHTML={{
                      __html: x?.paragraph,
                    }}
                  ></p>
                </div>
              ) : (
                <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6">
                  <p
                    className=" text-lg text-black lg:order-1 md:order-2 sm:order-2"
                    dangerouslySetInnerHTML={{
                      __html: x?.paragraph,
                    }}
                  ></p>
                  {x?.img !== "" && (
                    <div className="w-full h-full lg:order-2 md:order-2 sm:order-1">
                      {x?.img?.includes("http") ? (
                        <img
                          className="w-full rounded-xl"
                          src={x?.img}
                          alt={x?.imgTags}
                        />
                      ) : (
                        <div className="w-full h-full flex justify-center items-center lg:order-2 md:order-2 sm:order-1">
                          <iframe
                            className="w-full lg:h-full md:h-[480px] sm:h-[280px] rounded-xl"
                            // width="560"
                            // height="315"
                            src={`https://www.youtube.com/embed/${x?.img}`}
                            title="YouTube video player"
                            allowFullScreen
                          ></iframe>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div
                className="my-16 text-lg text-black lg:order-1 md:order-2 sm:order-2"
                dangerouslySetInnerHTML={{
                  __html: x?.paragraphFull,
                }}
              ></div>
            </div>
          );
        })}
      </motion.div>

      <div ref={ref}>
        <motion.div
          initial={{
            x: "-100",
            opasity: 0,
            visibility: "hidden",
          }}
          animate={animation1}
        >
          {/* CREATED BY ADMIN */}
          {/* <div className="bg-gray-200 p-12 flex lg:flex-row sm:flex-col justify-between gap-6 w-full mt-20">
            <div>
              <p className="uppercase tracking-widest text-sm">created by</p>
              <p className="text-lg text-black font-semibold tracking-widest mt-4">
                admin
              </p>
            </div>
            <div>
              <p className="uppercase tracking-widest text-sm">share to</p>
             
              <div className="flex gap-2 mt-4 text-lg text-black">
                <FacebookShareButton
                  url={window.location.href}
                  quote={serviceData?.articleTitle}
                  description={serviceData?.articlePara[0]?.paragraph}
                  className="Demo__some-network__share-button"
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>

                <LinkedinShareButton
                  url={window.location.href}
                  quote={serviceData?.articleTitle}
                  description={serviceData?.articlePara[0]?.paragraph}
                  className="Demo__some-network__share-button"
                >
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>

                <PinterestShareButton
                  url={window.location.href}
                  quote={serviceData?.articleTitle}
                  description={serviceData?.articlePara[0]?.paragraph}
                  className="Demo__some-network__share-button"
                >
                  <PinterestIcon size={32} round />
                </PinterestShareButton>

                <TwitterShareButton
                  url={window.location.href}
                  quote={serviceData?.articleTitle}
                  description={serviceData?.articlePara[0]?.paragraph}
                  className="Demo__some-network__share-button"
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>

                <WhatsappShareButton
                  url={window.location.href}
                  quote={serviceData?.articleTitle}
                  description={serviceData?.articlePara[0]?.paragraph}
                  className="Demo__some-network__share-button"
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </div>
            </div>
          </div> */}
          {/* PROJECTS */}
          <div className="max-w-7xl mx-auto px-4 mt-16 flex flex-col justify-center items-center">
            <p className="text-3xl uppercase font-semibold ">
              related projects
            </p>
            <ShowProjects project={project}></ShowProjects>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceDetails;
