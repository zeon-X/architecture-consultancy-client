import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";

const Blog = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    isLoading,
    isError,
    data: blog,
    error,
  } = useQuery(["blogsuser"], async ({}) => {
    let data = await axiosInstance.get("blog/get");
    Swal.close();
    return data;
  });

  useEffect(() => {
    if (isLoading === true) {
      setLoading(true);
      Swal.showLoading();
    } else if (loading === true) {
      Swal.close();
      setLoading(false);
    }
  }, [isLoading]);
  return (
    <div className="lg:px-20 sm:px-8 py-10 w-full max-w-7xl mx-auto flex flex-col justify-center items-center min-h-screen">
      {/* intro */}
      <div className="">
        <p className="text-sm text-black tracking-widest uppercase text-center">
          our blogs
        </p>
        <p className="text-4xl font-semibold text-gray-800 mt-3 mb-8 text-center">
          Here we share our ideas
        </p>
      </div>

      {/* BLOGS THUMB */}
      {blog?.data?.map((x, index) => {
        return (
          <div key={index} className="w-full my-10">
            {index % 2 === 1 && (
              <div className="flex lg:flex-row sm:flex-col lg:h-[360px] sm:h-[480px] gap-10 ">
                {/* WRITING PART */}
                <div className="lg:w-5/12 sm:w-full flex flex-col justify-center items-center  lg:h-[360px] sm:h-[480px] lg:order-1 sm:order-2">
                  <div className="w-full flex flex-col justify-center lg:items-end sm:items-start ">
                    <p>Updated At: {x?.updatedAt.split("T")[0]}</p>
                    <p className="text-3xl font-semibold mt-6 lg:text-right sm:text-left">
                      {x?.blogTitle?.slice(0, 20)}
                    </p>
                    <p className="my-6  text-gray-400  lg:text-right sm:text-left">
                      {x?.blogPara[0]?.paragraph?.slice(0, 120)}..
                    </p>
                    <button
                      onClick={() => {
                        navigate(`/blog-details/${x?._id}`);
                      }}
                      className="flex items-center justify-center gap-2 uppercase font-semibold"
                    >
                      Read More
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* IMAGE PART */}
                <div
                  style={{ backgroundImage: `url(${x?.blogPara[0]?.img})` }}
                  className="lg:w-7/12 sm:w-full  lg:h-[360px] sm:h-[480px]  bg-no-repeat bg-cover bg-center lg:order-2 sm:order-1"
                >
                  <div className="border-b border-black w-[100px] ml-[-35px] mt-[78px] lg:block sm:hidden"></div>
                </div>
              </div>
            )}
            {index % 2 === 0 && (
              <div className="flex lg:flex-row sm:flex-col lg:h-[360px] sm:h-[480px] gap-10">
                {/* IMAGE PART */}
                <div
                  style={{ backgroundImage: `url(${x?.blogPara[0]?.img})` }}
                  className="lg:w-7/12 sm:w-full  lg:h-[360px] sm:h-[480px] flex justify-end items-start  bg-no-repeat bg-cover bg-center"
                >
                  <div className="border-b border-black w-[100px] mr-[-35px] mt-[78px] lg:block sm:hidden"></div>
                </div>
                {/* WRITING PART */}
                <div className="lg:w-5/12 sm:w-full flex flex-col justify-center items-center  lg:h-[360px] sm:h-[480px]">
                  <div className="w-full">
                    <p>Updated At: {x?.updatedAt.split("T")[0]}</p>
                    <p className="text-3xl font-semibold mt-6">
                      {x?.blogTitle?.slice(0, 20)}
                    </p>
                    <p className="my-6  text-gray-400">
                      {x?.blogPara[0]?.paragraph.slice(0, 120)}..
                    </p>
                    <button
                      onClick={() => {
                        navigate(`/blog-details/${x?._id}`);
                      }}
                      className="flex items-center justify-center gap-2 uppercase font-semibold"
                    >
                      Read More
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Blog;
