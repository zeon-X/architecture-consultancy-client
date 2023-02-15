import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ErrorPage from "../../shared/ErrorPage";
import Loading from "../../shared/Loading";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import ShowProjects from "./ShowProjects";

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

  const { ref, inView } = useInView();
  const animation = useAnimation();
  // const animatio1 = useAnimation();
  useEffect(() => {
    if (inView) {
      animation.start({
        x: 0,
        opasity: 1,
        visibility: "visible",
      });
    }
  }, [inView]);

  return (
    <div
      id=""
      className="max-w-7xl mx-auto px-4 flex flex-col justify-center items-center min-h-screen my-10"
    >
      <motion.div
        ref={ref}
        initial={{
          x: -100,
          visibility: "hidden",
          opasity: 0,
        }}
        animate={animation}
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
      </motion.div>

      <div className="min-h-screen mt-6">
        <ShowProjects
          ref={ref}
          inView={inView}
          project={project}
        ></ShowProjects>
      </div>
    </div>
  );
};

export default ViewAllProjects;
