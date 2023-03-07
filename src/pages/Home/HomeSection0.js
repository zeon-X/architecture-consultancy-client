import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
// import project from "../../JSON/HeroJSON";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ar from "../../assets/object/ar.webp";

const HomeSection0 = () => {
  const navigate = useNavigate();
  const [heroState, setHeroState] = useState(0);
  // fetch projetcs
  const {
    isLoading,
    isError,
    data: project,
    error,
  } = useQuery(["heroprojectdatahome"], async () => {
    let data = await axiosInstance.get(`project/get-hero-projects?limit=3`);
    let tem = data;

    return tem;
  });
  // console.log(project);

  const handleBgChange = (index) => {
    setHeroState(index);
  };

  //animation
  const { ref, inView } = useInView({ threshold: 0.4 });
  const animation = useAnimation();
  const animation1 = useAnimation();
  useEffect(() => {
    if (inView) {
      animation.start({
        x: 0,
        opasity: 1,
      });
      animation1.start({
        y: 0,
        opacity: 1,
      });
    }
    // if (!inView) {
    //   animation.start({
    //     x: -100,
    //     opasity: 0,
    //   });
    //   animation1.start({
    //     y: 100,
    //     opacity: 0,
    //   });
    // }
  }, [inView]);

  // console.log(project?.data[heroState]?.img);
  return (
    <section id="hs0" className="w-full mt-[-80px]">
      {/* MAIN DIV */}
      <div
        ref={ref}
        // style={{
        //   backgroundImage: `url(${project?.data[heroState]?.img})`,
        // }}
        className="h-screen w-full relative flex flex-col items-center"
      >
        <div className="h-screen w-full">
          {project?.data[heroState]?.img?.includes("mp4") && (
            <video className="myVideo" loop muted autoPlay>
              <source src={project?.data[heroState]?.img} type="video/mp4" />
            </video>
          )}
          {!project?.data[heroState]?.img?.includes("mp4") && (
            <div
              style={{
                backgroundImage: `url(${project?.data[heroState]?.img})`,
              }}
              className="h-screen w-full bg-cover bg-center"
            ></div>
          )}
        </div>
        {/* INSIDE BG DIV */}
        <div className="max-w-6xl lg:px-0 md:px-10 sm:px-10  mx-auto h-full flex lg:flex-row md:flex-row sm:flex-col  gap-6 justify-center items-center absolute lg:top-0 md:top-0 sm:top-28 text-white">
          {/* LEFT SIDE */}
          <motion.div
            animate={animation}
            initial={{
              x: -100,
              opasity: 0,
            }}
            className="lg:w-8/12 md:w-8/12 sm:w-full h-full flex flex-col justify-center py-10 items-start"
          >
            {/* BIG TITLE */}
            <div className="mb-24">
              <p
                style={{ color: "rgba(255, 255, 255, 0.9)" }}
                className="font-bold lg:text-7xl sm:text-5xl"
              >
                {project?.data[heroState]?.title}
              </p>

              <div className="flex  gap-4">
                <button
                  onClick={() =>
                    navigate(
                      `/project-details/${project?.data[heroState]?._id}/${project?.data[heroState]?.category?._id}`
                    )
                  }
                  className=" bg-white border border-white rounded-none mt-6 text-black text-sm lg:px-16 sm:px-6 py-4 hover:bg-gray-300 "
                >
                  Discover now
                </button>
                <button
                  onClick={() => navigate("/pricing/#pricing-top")}
                  className=" border border-white rounded-none mt-6 text-white text-sm lg:px-16 sm:px-6 py-4 font-semibold hover:bg-white hover:text-black "
                >
                  Get a Quote
                </button>
              </div>
            </div>
            {/* Buttons */}
            <div className="btn-group text-gray-300 gap-4 flex-wrap justify-center items-center">
              {project?.data?.map((x, index) => {
                return (
                  <div key={index} className="flex justify-center items-center">
                    <button
                      className={
                        index === heroState
                          ? "text-xl font-bold text-white"
                          : "text-xl  text-gray-300"
                      }
                      onClick={() => handleBgChange(index)}
                    >
                      0{index + 1}
                    </button>
                    {index === heroState ? (
                      <div className="border border-b border-white w-[44px] ml-4"></div>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
          {/* RIGHT SIDE */}
          <div className="lg:w-4/12  h-full sm:hidden lg:flex md:flex flex-col lg:justify-end md:justify-end sm:justify-center items-center">
            <motion.div
              animate={animation1}
              initial={{
                y: -100,
                opasity: 0,
              }}
              className="flex flex-col items-start mb-32"
            >
              <button
                onClick={() =>
                  navigate(
                    `/project-details/${project?.data[heroState]?._id}/${project?.data[heroState]?.category?._id}`
                  )
                }
                className="mb-8 hover:cursor-pointer hover:scale-90 transition-all ease-in-out"
              >
                <img className="lg:h-[120px]  md:h-[60px] " src={ar} alt="" />
              </button>
              <p>
                {project?.data[heroState]?.title} -{" "}
                {project?.data[heroState]?.location}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection0;
