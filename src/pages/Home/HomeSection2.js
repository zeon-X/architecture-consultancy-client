import { useAnimation, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useQuery } from "react-query";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const HomeSection2 = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView({ threshold: 0.2 });
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

  const {
    isLoading,
    isError,
    data: category,
    error,
  } = useQuery(["servicecatmainuser"], async () => {
    // console.log(changes);
    let data = await axiosInstance.get("service-category/get-parent");
    return data?.data;
  });

  // console.log(category);

  return (
    <section
      ref={ref}
      id="hs2"
      className="w-full pt-16 flex justify-center items-center"
    >
      <motion.div
        initial={{
          x: -100,
          opasity: 0,
          visibility: "hidden",
        }}
        animate={animation}
        className="w-full flex flex-col justify-center items-center"
      >
        {/* heading */}
        <div className="w-full flex lg:flex-row md:flex-row sm:flex-col justify-between lg:items-center md:items-center sm:items-start lg:px-16 md:px-10 sm:px-2">
          <p className="text-3xl font-bold text-black">What we do</p>
          <button
            onClick={() => navigate("/services")}
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
            See more service
          </button>
        </div>

        {/* main categories article DSKTOP */}
        <div className="w-full lg:flex md:hidden sm:hidden h-[580px] mt-6 text-white hover-effect-container">
          {/* <div className="relative w-3/12 overflow-hidden">
            <div
              style={{
                backgroundImage: `url(${
                  category ? category[0]?.categoryImage : ""
                })`,
              }}
              className="w-full h-full bg-center bg-cover bg-move hover-parent"
            ></div>
            <div className="absolute   w-full  flex flex-col items-start justify-end p-6  affected">
             
              <p className="select-none font-bold text-2xl ">
                {category ? category[0]?.categoryTitle : ""}
              </p>
              <div className="mt-16 affected-child">
                <p className="select-none ">
                  {category ? category[0]?.categoryDiscription : ""}
                </p>
                <button
                  onClick={() =>
                    navigate(`/services/${category[0]?.categoryCode}`)
                  }
                  className="mt-4 btn rounded-none bg-red-500 border-none text-white"
                >
                  Read More
                </button>
              </div>
            </div>
          </div> */}

          <div
            style={{
              backgroundImage: `url(${
                category ? category[0]?.categoryImage : ""
              })`,
            }}
            className="relative w-3/12 bg-center bg-cover bg-move "
          >
            <div className="absolute bottom-10 left-10 ">
              <p className=" font-bold text-2xl">
                {category ? category[0]?.categoryTitle : ""}
              </p>
              <div className="">
                <p className="">
                  {category ? category[0]?.categoryDiscription : ""}
                </p>
                <button
                  onClick={() =>
                    navigate(`/services/${category[0]?.categoryCode}`)
                  }
                  className="mt-4 btn rounded-none bg-red-500 border-none text-white"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundImage: `url(${
                category ? category[1]?.categoryImage : ""
              })`,
            }}
            className="relative w-3/12 bg-center bg-cover bg-move "
          >
            <div className="absolute bottom-10 left-10 ">
              <p className=" font-bold text-2xl">
                {category ? category[1]?.categoryTitle : ""}
              </p>
              <div className="">
                <p className="">
                  {category ? category[1]?.categoryDiscription : ""}
                </p>
                <button
                  onClick={() =>
                    navigate(`/services/${category[1]?.categoryCode}`)
                  }
                  className="mt-4 btn rounded-none bg-red-500 border-none text-white"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>

          <div className="w-6/12 flex flex-col justify-evenly">
            <div
              style={{
                backgroundImage: `url(${
                  category ? category[2]?.categoryImage : ""
                })`,
              }}
              className="relative h-[290px] bg-center bg-cover bg-move-tb "
            >
              <div className="absolute bottom-10 left-10 ">
                <p className=" font-bold text-2xl">
                  {category ? category[2]?.categoryTitle : ""}
                </p>
                <div className="">
                  <p className="">
                    {category ? category[2]?.categoryDiscription : ""}
                  </p>
                  <button
                    onClick={() =>
                      navigate(`/services/${category[2]?.categoryCode}`)
                    }
                    className="mt-4 btn rounded-none bg-red-500 border-none text-white"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
            <div className="flex h-[290px] ">
              <div
                style={{
                  backgroundImage: `url(${
                    category ? category[3]?.categoryImage : ""
                  })`,
                }}
                className="relative w-6/12 bg-center bg-cover bg-move "
              >
                <div className="absolute bottom-10 left-10 ">
                  <p className=" font-bold text-2xl">
                    {category ? category[3]?.categoryTitle : ""}
                  </p>
                  <div className="">
                    <p className="">
                      {category ? category[3]?.categoryDiscription : ""}
                    </p>
                    <button
                      onClick={() =>
                        navigate(`/services/${category[3]?.categoryCode}`)
                      }
                      className="mt-4 btn rounded-none bg-red-500 border-none text-white"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundImage: `url(${
                    category ? category[4]?.categoryImage : ""
                  })`,
                }}
                className="relative w-6/12 bg-center bg-cover bg-move "
              >
                <div className="absolute bottom-10 left-10 ">
                  <p className=" font-bold text-2xl">
                    {category ? category[4]?.categoryTitle : ""}
                  </p>
                  <div className="">
                    <p className="">
                      {category ? category[4]?.categoryDiscription : ""}
                    </p>
                    <button
                      onClick={() =>
                        navigate(`/services/${category[4]?.categoryCode}`)
                      }
                      className="mt-4 btn rounded-none bg-red-500 border-none text-white"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* main categories article MOBILE */}
        <div className="w-full lg:hidden md:flex sm:flex flex-wrap mx-auto gap-3 mt-10 text-white ">
          {category?.map((x) => {
            return (
              <div
                key={x?._id}
                style={{
                  backgroundImage: `url(${x?.categoryImage})`,
                }}
                className="relative w-full h-[420px] bg-center bg-cover bg-move "
              >
                <div className="absolute bottom-10 left-10 ">
                  <p className="font-bold text-2xl">{x?.categoryTitle}</p>
                  <div className="">
                    <p className="my-4">{x?.categoryDiscription}</p>
                    <button
                      onClick={() => navigate(`/services/${x?.categoryCode}`)}
                      className="btn rounded-none bg-red-500 border-none"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default HomeSection2;
