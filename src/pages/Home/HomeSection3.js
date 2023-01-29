import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import ErrorPage from "../../shared/ErrorPage";
import Loading from "../../shared/Loading";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";

import "./Home.css";

const HomeSection3 = () => {
  const navigate = useNavigate();
  const [categoryChange, setCategoryChange] = useState("");
  const [loading, setLoading] = useState(false);

  // fetch project by category function
  const fetchProjects = async () => {
    let api = "";
    if (!categoryChange || categoryChange === "") {
      api = `project/get-active-by-basic?limit=6`;
    } else {
      api = `project/find-by-cat-basic?_catId=${categoryChange}&limit=6`;
    }

    // console.log(api);
    return await axiosInstance.get(api);
  };

  // fetch projetcs by cat api calling and state management
  const {
    isLoading,
    isError,
    data: project,
    error,
  } = useQuery(["projectsSearch", categoryChange], fetchProjects);

  // categories fetching
  const {
    isLoading1,
    isError1,
    data: category,
    error1,
  } = useQuery(["categorys"], async ({}) => {
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
    <section
      id="hs3"
      className="px-4 py-16 w-full flex flex-col justify-center items-center"
    >
      <div className="sm:px-8">
        <p className="text-4xl font-bold text-gray-800 mt-6 mb-8 text-center">
          Check our latest works
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
        {category?.data?.map((x) => {
          return (
            <div>
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
      <div className="flex flex-wrap justify-center items-center gap-5 my-10 max-w-7xl mx-auto">
        {project?.data?.map((x) => {
          return (
            <div
              className="project-card bg-white relative h-[365px] w-[365px] bg-cover bg-center "
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

      <button
        onClick={() => navigate("/view-all-works")}
        className="text-gray-400 tracking-widest text-sm hover:text-black underline"
      >
        view all works
      </button>
    </section>
  );
};

export default HomeSection3;
