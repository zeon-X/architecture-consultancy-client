import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Swal from "sweetalert2";

import ErrorPage from "../../shared/ErrorPage";
import Loading from "../../shared/Loading";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";

const ViewAllProjects = () => {
  const [categoryChange, setCategoryChange] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    let api = "";
    if (!categoryChange || categoryChange === "") {
      api = `project/get-active-by-basic`;
    } else {
      api = `project/find-by-cat-basic?_catId=${categoryChange}`;
    }

    return await axiosInstance.get(api);
  };

  const {
    isLoading,
    isError,
    data: project,
    error,
  } = useQuery(["viewallprojectsbycat", categoryChange], fetchProjects);

  // categories fetching
  const {
    isLoading1,
    isError1,
    data: category,
    error1,
  } = useQuery(["categories"], async ({}) => {
    return await axiosInstance.get("category/get");
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
    <div
      id=""
      className="lg:px-20 sm:px-8 py-10 w-full max-w-7xl mx-auto flex flex-col justify-center items-center min-h-screen"
    >
      {/* intro */}
      <div className="">
        <p className="text-4xl font-bold text-gray-800 mt-6 mb-8 text-center">
          Our latest works
        </p>
      </div>

      {/* CATEGORIES */}
      <div className="btn-group text-gray-300 gap-4 flex-wrap justify-center items-center">
        <div>
          <button
            onClick={() => {
              setCategoryChange("");
            }}
            className={
              categoryChange === ""
                ? "text-center text-sm text-black "
                : "text-center text-sm text-gray-500 "
            }
          >
            All
          </button>
        </div>
        {category?.data?.map((x, index) => {
          return (
            <div key={index}>
              <button
                onClick={() => {
                  setCategoryChange(x?._id);
                }}
                className={
                  categoryChange === x?._id
                    ? "text-center text-sm text-black  "
                    : "text-center text-sm text-gray-500"
                }
              >
                {x?.categoryTitle}
              </button>
            </div>
          );
        })}
      </div>

      {/* PROJECTS */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-center items-center gap-5 my-10 max-w-7xl mx-auto ">
        {project?.data?.map((x, index) => {
          return (
            <div className="border border-gray-100 rounded-2xl">
              <div
                key={index}
                className=" rounded-tl-2xl rounded-tr-2xl bg-white relative h-[180px] w-full bg-cover bg-center "
                style={{ backgroundImage: `url(${x?.img})` }}
              ></div>
              <div className="my-4 p-4">
                <p className=" text-sm font-semibold">
                  {x?.title?.slice(0, 32)}
                </p>
                <p className="text-xs ">Location: {x?.location}</p>
                <p className="text-xs my-4 text-gray-500">
                  {x?.aboutLeft?.slice(0, 90)}..
                </p>

                <button className="">Learn more</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewAllProjects;
