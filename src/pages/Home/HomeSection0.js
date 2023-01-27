import React, { useState } from "react";
import { useQuery } from "react-query";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";

const HomeSection0 = () => {
  const [heroState, setHeroState] = useState(0);
  // fetch projetcs

  const {
    isLoading,
    isError,
    data: project,
    error,
  } = useQuery(["heroprojectdata"], async () => {
    return await axiosInstance.get(`project/get?limit=3`);
  });

  const handleBgChange = (index) => {
    setHeroState(index);
  };
  return (
    <section className="w-full mb-16">
      {/* MAIN DIV */}
      <div
        style={{ backgroundImage: `url(${project?.data[heroState]?.img})` }}
        className="lg:h-[720px] md:h-[540px] sm:h-[720px] bg-center bg-cover transition-all ease-in-out bg-hero"
      >
        {/* INSIDE BG DIV */}
        <div className="max-w-6xl lg:px-0 md:px-10 sm:px-10  mx-auto h-full flex lg:flex-row md:flex-row sm:flex-col gap-6 justify-center items-center  text-white">
          {/* LEFT SIDE */}
          <div className="lg:w-8/12 md:w-full sm:w-full h-full flex flex-col justify-center items-start">
            <div className="lg:mb-24 md:mb-0 sm:mb-0">
              <p className="font-bold text-6xl">The art of building</p>
              <button className=" bg-white border-none rounded-none mt-6 text-black text-sm px-16 py-4">
                Discover now
              </button>
            </div>
            {/* Button */}
            <div className="btn-group text-gray-300 gap-4 flex-wrap justify-center items-center">
              {project?.data?.map((x, index) => {
                return (
                  <div className="flex justify-center items-center">
                    <button
                      className={
                        index === heroState
                          ? "text-xl font-bold"
                          : "text-xl  text-gray-300"
                      }
                      onClick={() => handleBgChange(index)}
                    >
                      0{index + 1}
                    </button>
                    {index === heroState ? (
                      <div className="border border-b border-white w-[44px] ml-4"></div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {/* RIGHT SIDE */}
          <div className="lg:w-4/12  md:w-full sm:w-full h-full flex flex-col justify-end items-center">
            <div className="flex flex-col lg:items-end md:items-end sm:items-start mb-10">
              <button className="mb-8 hover:cursor-pointer ">
                <img
                  className="w-[180px] h-[120px]"
                  src={"https://i.ibb.co/PtckDVr/ar.png"}
                  alt=""
                />
              </button>
              <p>
                {project?.data[heroState]?.title} -{" "}
                {project?.data[heroState]?.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection0;
