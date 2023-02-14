import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

import ErrorPage from "../../shared/ErrorPage";
import Loading from "../../shared/Loading";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";

import "./Home.css";
import ShowProjects from "../Project/ShowProjects";

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
      className="px-4 py-16 w-full flex flex-col justify-center items-center "
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
                : "text-center text-sm  text-gray-400 hover:text-black"
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
                    : "text-center text-sm text-gray-400 hover:text-black"
                }
              >
                {x?.categoryTitle}
              </button>
            </div>
          );
        })}
      </div>

      <ShowProjects project={project}></ShowProjects>

      <button
        onClick={() => navigate("/all-projects")}
        // className="font-semibold tracking-widest text-sm hover:text-red-500"
        className="btn btn-xs text-white px-6 border-none"
      >
        view all works
      </button>
    </section>
  );
};

export default HomeSection3;
