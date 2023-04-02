import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const HomeSection6 = () => {
  const navigate = useNavigate();
  const {
    isLoading,
    isError,
    data: blog,
    error,
  } = useQuery(["blogsuserhome"], async ({}) => {
    let data = await axiosInstance.get("blog/get?limit=4");
    let tem = data?.data;
    return tem;
  });

  // console.log(blog);
  const month = [
    "",
    "January",
    "Ferbruary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const { ref, inView } = useInView({ threshold: 0.3 });
  const animation = useAnimation();
  const animation1 = useAnimation();
  useEffect(() => {
    if (inView) {
      animation.start({
        x: 0,
        opasity: 1,
        visibility: "visible",
      });
      animation1.start({
        x: 0,
        transition: {
          delay: 0.2,
        },
        opasity: 1,
        visibility: "visible",
      });
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className=" px-4 my-16 w-full flex justify-center items-center"
    >
      <motion.div
        initial={{
          x: -100,
          opasity: 0,
          visibility: "hidden",
        }}
        animate={animation1}
        className="w-full flex flex-col justify-center items-center"
      >
        <div className="w-full flex flex-col justify-center items-center">
          {/* intro */}
          <div className="">
            <p className="text-sm text-black tracking-widest uppercase text-center">
              our blogs
            </p>
            <p className="text-4xl font-semibold text-gray-800 mt-3 mb-8 text-center">
              Latest News
            </p>
          </div>

          {isLoading === true ? (
            <div className="h-[600px] flex justify-center items-center">
              <button className="btn loading">loading</button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-6 h-full w-full max-w-7xl my-6">
              {blog?.map((x, index) => {
                return (
                  <div key={index}>
                    <div className="flex h-full bg-white shadow-lg hover:scale-95 hover:rounded-xl transition-all ease-in-out">
                      <div className="w-5/12 h-full p-8 relative">
                        <p className="text-xl font-semibold">{x?.blogTitle}</p>
                        <p className="my-4 text-sm font-semibold">NEWS</p>
                        <p className="uppercase text-gray-500">
                          {
                            month[
                              parseInt(
                                x?.createdAt?.split("T")[0]?.split("-")[1]
                              )
                            ]
                          }{" "}
                          {x?.createdAt?.split("T")[0]?.split("-")[2]}
                          {", "}
                          {x?.createdAt?.split("T")[0]?.split("-")[0]}
                        </p>
                        <button
                          onClick={() => {
                            navigate(`/blogs/${x?.slug}`);
                          }}
                          className=" text-sm uppercase mt-2 hover:text-red-500 absolute bottom-10"
                        >
                          Read More
                        </button>
                      </div>
                      <div
                        style={{
                          backgroundImage: `url(${x?.blogPara[0]?.img})`,
                        }}
                        className="h-full min-h-[400px] bg-cover bg-center relative w-7/12"
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <button
          onClick={() => navigate("/blogs")}
          className="uppercase text-gray-600 text-sm font-semibold mt-10"
        >
          view all blogs
        </button>
      </motion.div>
    </div>
  );
};

export default HomeSection6;
