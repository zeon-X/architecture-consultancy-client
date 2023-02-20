import { useAnimation, motion } from "framer-motion";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";

const SeeAllService = () => {
  const navigate = useNavigate();
  const {
    isLoading,
    isError,
    data: category,
    error,
  } = useQuery(["servicecatalluser"], async () => {
    // console.log(changes);
    let data = await axiosInstance.get("service-category/get");
    return data?.data;
  });

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
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col  items-center min-h-screen my-10">
        {/* intro */}
        <div className="">
          <p className="text-sm text-black tracking-widest uppercase text-center">
            our services
          </p>
          <p className="text-4xl font-semibold text-gray-800 mt-3 mb-8 text-center">
            Here we share all our services
          </p>
        </div>

        {/* cats service */}
        <div className="w-full">
          <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-3 mt-10 text-white ">
            {category?.map((x) => {
              return (
                <div
                  key={x?._id}
                  style={{
                    backgroundImage: `url(${x?.categoryImage})`,
                  }}
                  className="relative w-full h-[420px] bg-center bg-cover bg-move transition-all ease-in-out"
                >
                  <div className="absolute bottom-10 left-10 ">
                    <p className="font-bold text-2xl">{x?.categoryTitle}</p>
                    <div className="">
                      <p className="my-4">{x?.categoryDiscription}</p>
                      <button
                        onClick={() =>
                          navigate(`/article-details/${x?.categoryCode}`)
                        }
                        className="btn rounded-none bg-red-500 border-none text-white"
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SeeAllService;
