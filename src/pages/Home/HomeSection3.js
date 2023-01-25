import React, { useState } from "react";
import { useQuery } from "react-query";

import ErrorPage from "../../shared/ErrorPage";
import Loading from "../../shared/Loading";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";

import "./Home.css";

const HomeSection3 = () => {
  // const {
  //   isLoading,
  //   isError,
  //   data: reviews,
  //   error,
  // } = useQuery(["reviewhome"], async () => {
  //   let fdata = await axiosInstance.get("review/get?limit=4");
  //   return fdata.data;
  // });

  // if (isError) return <ErrorPage msg={error}></ErrorPage>;

  // if (isLoading) return <Loading msg="Loading..."></Loading>;

  const cat = [
    {
      categoryTitle: "All",
      categoryCode: "",
    },
    {
      categoryTitle: "Landscaping",
      categoryCode: "",
    },
    {
      categoryTitle: "Gardening",
      categoryCode: "",
    },
    {
      categoryTitle: "Exterior Design",
      categoryCode: "",
    },
    {
      categoryTitle: "Interior Design",
      categoryCode: "",
    },
    {
      categoryTitle: "Planning",
      categoryCode: "",
    },
    {
      categoryTitle: "Food Truck",
      categoryCode: "",
    },
    {
      categoryTitle: "Booth Design",
      categoryCode: "",
    },
  ];

  const [changes, increaseChanges] = useState(0);
  const {
    isLoading,
    isError,
    data: project,
    error,
  } = useQuery(["projects", changes], async ({ changes }) => {
    console.log(changes);
    return await axiosInstance.get("project/get-active-by-basic?limit=6");
  });

  const {
    isLoading1,
    isError1,
    data: category,
    error1,
  } = useQuery(["categorys", changes], async ({ changes }) => {
    console.log(changes);
    return await axiosInstance.get("category/get");
  });

  // const projects = [
  //   {
  //     title: "Apartment Design and Decor",
  //     pic: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     location: "Dhaka, Bangladesh",
  //   },
  //   {
  //     title: "Zeex Interior Design",
  //     pic: "https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     location: "Dhaka, Bangladesh",
  //   },
  //   {
  //     title: "Mega mall Exterior Design",
  //     pic: "https://images.pexels.com/photos/13255334/pexels-photo-13255334.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     location: "Dhaka, Bangladesh",
  //   },
  //   {
  //     title: "Dhaka building Design",
  //     pic: "https://images.pexels.com/photos/13029436/pexels-photo-13029436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     location: "Dhaka, Bangladesh",
  //   },
  //   {
  //     title: "Aarong Rajshahi",
  //     pic: "http://blog.brac.net/wp-content/uploads/2011/04/aarong-launches-a-flagship-store.jpg",
  //     location: "Rajshahi, Bangladesh",
  //   },
  //   {
  //     title: "Poolscape Villa",
  //     pic: "https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     location: "Dhaka, Bangladesh",
  //   },
  // ];

  return (
    <section
      id="hs3"
      className="lg:px-20 sm:px-8 py-16 w-full flex flex-col justify-center items-center"
    >
      <div className="">
        {/* <div className="flex items-center ">
          <p className="text-xs text-gray-400 w-4/12 tracking-widest uppercase">
            our portfolio
          </p>
          <div className="w-3/12 border-b border-gray-400"></div>
        </div> */}
        <p className="text-4xl font-bold text-gray-800 mt-6 mb-8 text-center">
          Check our latest works
        </p>
      </div>

      {/* CATEGORIES */}
      <div className="text-black text-sm gap-4 grid lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-3 justify-center">
        <div>
          <button className="text-center w-full  btn btn-xs">All</button>
        </div>
        {category?.data?.map((x) => {
          return (
            <div>
              <button className="text-center w-full btn btn-xs">
                {x.categoryTitle}
              </button>
            </div>
          );
        })}
      </div>

      {/* PROJECTS */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 my-10 ">
        {project?.data?.map((x) => {
          return (
            <div
              className="project-card bg-white relative h-[340px] w-[340px] bg-cover bg-center "
              style={{ backgroundImage: `url(${x?.img})` }}
            >
              <div className="w-full h-full project-img  border-white transition-all ease-in-out "></div>
              <div className="project-view-btn gap-2 flex items-center">
                <p className="text-xs font-semibold">{x?.title}</p>
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

      <button className="text-gray-400 tracking-widest text-sm">
        view all works
      </button>
    </section>
  );
};

export default HomeSection3;
