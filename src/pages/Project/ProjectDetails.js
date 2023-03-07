import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
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
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import ShowProjects from "./ShowProjects";
import Loading from "../../shared/Loading";

const ProjectDetails = () => {
  const { _id, catId } = useParams();
  // console.log(_id);
  const [load, isLoad] = useState(false);

  const {
    isLoading,
    isError,
    data: projectDetails,
    error,
  } = useQuery(["vcppd", _id], async () => {
    let api = "";
    api = `project/find?_id=${_id}`;
    // Swal.showLoading();
    let fdata = await axiosInstance.get(api);
    // Swal.close();
    return fdata?.data;
  });

  // console.log(projectDetails);

  const {
    isLoading1,
    isError1,
    data: project,
    error1,
  } = useQuery(["catname", catId], async () => {
    let api = "";
    api = `project/find-by-cat-basic?_catId=${catId}&limit=3`;
    let fdata = await axiosInstance.get(api);
    // console.log(fdata);
    return fdata;
  });

  const [imgTags, setImgTags] = useState([]);

  useEffect(() => {
    isLoad(true);
    let tem = projectDetails?.aboutRight?.split(",");
    setImgTags(tem);
    isLoad(false);
  }, [projectDetails]);

  // console.log(imgTags);

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

  // console.log(imgTags === undefined);

  if (isLoading1 || isLoading || load) return <Loading></Loading>;

  return (
    <div className="flex flex-col  items-center min-h-screen w-full">
      <div
        className="relative lg:h-[320px] sm:h-[220px] w-full bg-cover bg-center shadow-xl flex justify-center items-center"
        style={{
          backgroundImage: `url(${
            projectDetails?.img?.includes("mp4")
              ? projectDetails?.galleryAfter[0]
              : projectDetails?.img
          })`,
        }}
      >
        <motion.p
          initial={{
            x: "-100vw",
            opasity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          style={{ color: "rgba(255, 255, 255, 0.7)" }}
          className="lg:text-7xl sm:text-5xl  font-extrabold tracking-widest uppercase "
        >
          <i>"Projects"</i>
        </motion.p>
      </div>
      <div className="max-w-7xl w-full mx-auto px-4 flex flex-col justify-center items-center ">
        <motion.div
          initial={{
            x: "-100vh",
            opasity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
            transition: {
              type: "spring",
              bounce: 0.1,
              duration: 1,
            },
          }}
          className="flex lg:flex-row md:flex-col sm:flex-col h-full justify-between gap-10 my-16 w-full"
        >
          {/* IMAGES */}
          <div className="lg:w-7/12 md:w-full sm:w-full h-full">
            {projectDetails?.galleryBefore.length !== 0 && (
              <div className="mb-6">
                <p className="text-3xl uppercase font-semibold mb-6">
                  Before Images
                </p>
                <div className="flex flex-col gap-6">
                  {projectDetails?.galleryBefore?.map((x, index) => {
                    return (
                      <img
                        key={index}
                        className="w-full"
                        src={x}
                        alt={projectDetails?.category?.categoryTitle}
                      />
                    );
                  })}
                </div>
              </div>
            )}
            {projectDetails?.galleryBefore?.length !== 0 ? (
              <div>
                <p className="text-3xl uppercase font-semibold  mb-6">
                  After Images
                </p>
                <div className="flex flex-col gap-6 ">
                  {projectDetails?.galleryAfter?.map((x, index) => {
                    return (
                      <img
                        key={index}
                        className="w-full"
                        src={x}
                        alt={
                          imgTags?.length !== 0 && imgTags !== undefined
                            ? imgTags[index]
                            : projectDetails?.category?.categoryTitle
                        }
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>
                {/* <p className="font-semibold text-2xl">Before Images</p> */}
                <div className="flex flex-col gap-6 ">
                  {projectDetails?.galleryAfter?.map((x, index) => {
                    return (
                      <img
                        key={index}
                        className="w-full"
                        src={x}
                        alt={
                          imgTags?.length !== 0 && imgTags !== undefined
                            ? imgTags[index]
                            : projectDetails?.category?.categoryTitle
                        }
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          {/* INFO */}
          <div className="lg:w-5/12 md:w-full sm:w-full h-full sticky top-28 ">
            <div className="">
              <p className="text-3xl uppercase font-semibold ">
                {projectDetails?.title}
              </p>
              <p
                className="mt-6 text-gray-700"
                dangerouslySetInnerHTML={{ __html: projectDetails?.aboutLeft }}
              ></p>
              {/* <p
                className="mb-6 text-gray-700"
                dangerouslySetInnerHTML={{ __html: projectDetails?.aboutRight }}
              ></p> */}

              {/* PROJECT INFO */}
              <div className="grid grid-cols-2 gap-6 mb-6 bg-white rounded shadow p-5">
                <div>
                  <p className="uppercase font-semibold">Client</p>
                  <p className="text-gray-500">{projectDetails?.client}</p>
                </div>
                <div>
                  <p className="uppercase font-semibold">projectYear</p>
                  <p className="text-gray-500">{projectDetails?.projectYear}</p>
                </div>

                <div>
                  <p className="uppercase font-semibold">location</p>
                  <p className="text-gray-500">{projectDetails?.location}</p>
                </div>
                <div>
                  <p className="uppercase font-semibold">designer</p>
                  <p className="text-gray-500">{projectDetails?.designer}</p>
                </div>
                <div>
                  <p className="uppercase font-semibold">service category</p>
                  <p className="text-gray-500 ">
                    {projectDetails?.category?.categoryTitle}
                  </p>
                </div>
              </div>

              {/* REVIEW */}
              {projectDetails?.reviewId !== "" && (
                <div className="my-16">
                  <p className="uppercase font-semibold text-3xl">
                    testimonial
                  </p>
                  <div className="">
                    {/* review details  */}
                    <p className="text-lg text-gray-600 mt-6">
                      <i>"{projectDetails?.reviewId?.reviewDiscription}"</i>
                    </p>
                    <div className="w-full">
                      {/* border */}
                      <div className="border-b border-gray-300 mt-4 w-11/12"></div>

                      {/* client info */}
                      <div className="flex gap-3 items-center mt-4">
                        <img
                          className="rounded-full w-10"
                          src={
                            projectDetails?.reviewId?.clientImg
                              ? projectDetails?.reviewId?.clientImg
                              : p
                          }
                          alt=""
                        />

                        <div>
                          <p className="text-sm font-semibold">
                            {projectDetails?.reviewId?.clientName}
                          </p>
                          <p className="text-sm">
                            {projectDetails?.reviewId?.clientDesignation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <p className="uppercase font-semibold">Share</p>
              <div className="flex gap-4 mt-2 text-lg text-gray-400">
                <FacebookShareButton
                  url={`https://imranscreation.com/project-details/${_id}/${catId}`}
                  quote={projectDetails?.title}
                  description={projectDetails?.aboutLeft?.slice(0, 90)}
                  className="Demo__some-network__share-button"
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>

                <LinkedinShareButton
                  url={`https://imranscreation.com/project-details/${_id}/${catId}`}
                  quote={projectDetails?.title}
                  description={projectDetails?.aboutLeft?.slice(0, 90)}
                  className="Demo__some-network__share-button"
                >
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>

                <PinterestShareButton
                  url={`https://imranscreation.com/project-details/${_id}/${catId}`}
                  quote={projectDetails?.title}
                  description={projectDetails?.aboutLeft?.slice(0, 90)}
                  className="Demo__some-network__share-button"
                >
                  <PinterestIcon size={32} round />
                </PinterestShareButton>

                <TwitterShareButton
                  url={`https://imranscreation.com/project-details/${_id}/${catId}`}
                  quote={projectDetails?.title}
                  description={projectDetails?.aboutLeft?.slice(0, 90)}
                  className="Demo__some-network__share-button"
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>

                <WhatsappShareButton
                  url={`https://imranscreation.com/project-details/${_id}/${catId}`}
                  quote={projectDetails?.title}
                  description={projectDetails?.aboutLeft?.slice(0, 90)}
                  className="Demo__some-network__share-button"
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div ref={ref} className="w-full">
        <motion.div
          initial={{
            x: "-100",
            opasity: 0,
            visibility: "hidden",
          }}
          animate={animation1}
          className="max-w-7xl mx-auto mt-16 flex flex-col justify-center items-center"
        >
          <p className="text-3xl uppercase font-semibold ">related projects</p>
          <ShowProjects project={project}></ShowProjects>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetails;
