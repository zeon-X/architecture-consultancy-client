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
                : "text-center text-sm  "
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
                    : "text-center text-sm "
                }
              >
                {x?.categoryTitle}
              </button>
            </div>
          );
        })}
      </div>

      {/* PROJECTS */}
      <div className="flex flex-wrap justify-center items-center gap-5 my-10 max-w-7xl mx-auto ">
        {project?.data?.map((x, index) => {
          return (
            <div
              key={index}
              className="project-card bg-white relative h-[340px] w-[340px] bg-cover bg-center "
              style={{ backgroundImage: `url(${x?.img})` }}
            >
              <div className="w-full h-full project-img  border-white transition-all ease-in-out "></div>
              <div className="project-view-btn gap-2 flex items-center">
                <p className="text-xs font-semibold">{x?.title.slice(0, 32)}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="black"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewAllProjects;
