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
    <div className="lg:px-20 sm:px-8 py-10 w-full  mx-auto flex flex-col justify-center items-center">
      {/* intro */}
      <div className="mb-24">
        <p className="text-5xl font-bold text-gray-800 mt-6 mb-8 text-center">
          Here we share our ideas.
        </p>
      </div>

      {/* BLOGS THUMB */}
      {blog?.data?.map((x, index) => {
        return (
          <div key={index} className="w-full lg:my-0 sm:my-6">
            {index % 2 === 0 && (
              <div className="flex lg:flex-row sm:flex-col h-[600px] gap-6 ">
                {/* WRITING PART */}
                <div className="lg:w-4/12 sm:w-full flex flex-col justify-center items-center  h-[600px] lg:order-1 sm:order-2">
                  <div className="lg:w-8/12 sm:w-full">
                    <p>Updated At: {x?.updatedAt.split("T")[0]}</p>
                    <p className="text-4xl font-bold mt-6">{x?.blogTitle}</p>
                    <p className="my-6 text-lg text-gray-400">
                      {x?.blogPara[0]?.paragraph.slice(0, 180)}..
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
                  className="lg:w-8/12 sm:w-full  h-[600px] lg:rounded-bl-[25%] sm:rounded-lg  bg-no-repeat bg-cover bg-center lg:order-2 sm:order-1"
                ></div>
              </div>
            )}
            {index % 2 === 1 && (
              <div className="flex lg:flex-row sm:flex-col h-[600px] gap-6">
                {/* IMAGE PART */}
                <div
                  style={{ backgroundImage: `url(${x?.blogPara[0]?.img})` }}
                  className="lg:w-8/12 sm:w-full  h-[600px] lg:rounded-br-[25%] sm:rounded-lg  bg-no-repeat bg-cover bg-center"
                ></div>
                {/* WRITING PART */}
                <div className="lg:w-4/12 sm:w-full flex flex-col justify-center items-center  h-[600px]">
                  <div className="lg:w-8/12 sm:w-full">
                    <p>Updated At: {x?.updatedAt.split("T")[0]}</p>
                    <p className="text-4xl font-bold mt-6">{x?.blogTitle}</p>
                    <p className="my-6 text-lg text-gray-400">
                      {x?.blogPara[0]?.paragraph.slice(0, 180)}..
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
