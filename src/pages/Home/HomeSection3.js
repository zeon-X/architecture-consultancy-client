import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import "./Home.css";
import ShowProjects from "../Project/ShowProjects";

const HomeSection3 = () => {
  const navigate = useNavigate();
  const [categoryChange, setCategoryChange] = useState("");

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
  } = useQuery(["categoryasdasdadasdsadasds"], async ({}) => {
    return await axiosInstance.get("service-category/get");
  });

  const { ref, inView } = useInView({ threshold: 0.15 });
  const animation = useAnimation();
  const animation1 = useAnimation();
  useEffect(() => {
    if (inView) {
      animation.start({
        x: 0,
        opasity: 1,
        visibility: "visible",
      });
      animation1.start({
        x: 0,
        opasity: 1,
        visibility: "visible",
        transition: {
          type: "spring",
          delay: 0.2,
          duration: 0.5,
          bounce: 0.1,
        },
      });
    }
  }, [inView]);

  return (
    <section
      id="our-latest-works"
      ref={ref}
      className="px-4 w-full py-24 flex justify-center items-center"
    >
      <motion.div
        initial={{
          x: -100,
          visibility: "hidden",
          opasity: 0,
        }}
        animate={animation1}
        className="w-full flex flex-col justify-center items-center "
      >
        <div>
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
        </div>

        {isLoading === true ? (
          <div className="h-[600px] flex justify-center items-center">
            <button className="btn loading">loading</button>
          </div>
        ) : (
          <div className="w-full mt-6">
            <ShowProjects project={project}></ShowProjects>
          </div>
        )}

        <button
          onClick={() => navigate("/all-projects")}
          className="uppercase text-gray-600 text-sm font-semibold"
        >
          view all works
        </button>
      </motion.div>
    </section>
  );
};

export default HomeSection3;
