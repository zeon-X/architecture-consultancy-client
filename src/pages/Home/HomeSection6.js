import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";

const HomeSection6 = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    isLoading,
    isError,
    data: blog,
    error,
  } = useQuery(["blogsuserhome"], async ({}) => {
    let data = await axiosInstance.get("blog/get?limit=6");
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
    <div className=" px-4 py-16 w-full flex flex-col justify-center items-center">
      {/* intro */}
      <div className="">
        <p className="text-sm text-black tracking-widest uppercase text-center">
          our blogs
        </p>
        <p className="text-4xl font-semibold text-gray-800 mt-3 mb-8 text-center">
          Latest News
        </p>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 w-full max-w-7xl">
        {blog?.data?.map((x, index) => {
          return (
            <div
              key={index}
              className="flex flex-col h-full border-2 border-gray-300 w-full"
            >
              {/* IMAGE PART */}
              <div
                style={{ backgroundImage: `url(${x?.blogPara[0]?.img})` }}
                className="h-[220px] flex justify-end items-start bg-cover bg-center relative"
              >
                <p className="border border-gray-300 uppercase text-sm bg-gray-100 px-2 ">
                  Published : {x?.updatedAt.split("T")[0]}
                </p>
              </div>
              {/* WRITING PART */}
              <div className=" p-4">
                <p className=" font-semibold">{x?.blogTitle}</p>

                <button
                  onClick={() => {
                    navigate(`/blog-details/${x?._id}`);
                  }}
                  className="flex items-center gap-2 text-sm uppercase mt-2 hover:text-red-500"
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
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => navigate("/blogs")}
        className="btn btn-xs text-white px-6 border-none mt-6"
      >
        view all blogs
      </button>
    </div>
  );
};

export default HomeSection6;
