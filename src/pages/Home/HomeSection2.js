import { useAnimation, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useQuery } from "react-query";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const HomeSection2 = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView({ threshold: 0.2 });
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

  const {
    isLoading,
    isError,
    data: category,
    error,
  } = useQuery(["servicecatmainuser"], async () => {
    // console.log(changes);
    let data = await axiosInstance.get("service-category/get");

    let tem = data?.data;
    let temarrp = [];
    let temarrs = [];
    for (const x in tem) {
      if (tem[x]?.categoryType === "parent") temarrp.push(tem[x]);
      else temarrs.push(tem[x]);
    }

    tem = temarrp.concat(temarrs);
    let finalarr = [];
    for (const x in tem) {
      if (x < 7) finalarr.push(tem[x]);
    }
    return finalarr;
  });

  // console.log(category);

  return (
    <section
      ref={ref}
      id="hs2"
      className="w-full pt-16 flex justify-center items-center"
    >
      <motion.div
        initial={{
          x: -100,
          opasity: 0,
          visibility: "hidden",
        }}
        animate={animation}
        className="w-full flex flex-col justify-center items-center"
      >
        {/* heading */}
        <div className="w-full flex lg:flex-row md:flex-row sm:flex-col justify-between lg:items-center md:items-center sm:items-start px-2">
          <p className="text-3xl font-bold text-black">What we do</p>
          <button
            onClick={() => navigate("/services")}
            className="flex items-center gap-2 text-sm uppercase mt-4 hover:text-red-500"
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
            See more service
          </button>
        </div>

        {/* main categories article DSKTOP */}
        {/* <div className="w-full lg:flex md:hidden sm:hidden h-[580px] mt-6 text-white hover-effect-container">
          

          <div
            style={{
              backgroundImage: `url(${
                category ? category[0]?.categoryImage : ""
              })`,
            }}
            className="relative w-3/12 bg-center bg-cover bg-move "
          >
            <div className="absolute bottom-10 left-10 ">
              <p className=" font-bold text-2xl">
                {category ? category[0]?.categoryTitle : ""}
              </p>
              <div className="">
                <p className="">
                  {category ? category[0]?.categoryDiscription : ""}
                </p>
                <button
                  onClick={() =>
                    navigate(`/services/${category[0]?.categoryCode}`)
                  }
                  className="mt-4 btn rounded-none bg-red-500 border-none text-white"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundImage: `url(${
                category ? category[1]?.categoryImage : ""
              })`,
            }}
            className="relative w-3/12 bg-center bg-cover bg-move "
          >
            <div className="absolute bottom-10 left-10 ">
              <p className=" font-bold text-2xl">
                {category ? category[1]?.categoryTitle : ""}
              </p>
              <div className="">
                <p className="">
                  {category ? category[1]?.categoryDiscription : ""}
                </p>
                <button
                  onClick={() =>
                    navigate(`/services/${category[1]?.categoryCode}`)
                  }
                  className="mt-4 btn rounded-none bg-red-500 border-none text-white"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>

          <div className="w-6/12 flex flex-col justify-evenly">
            <div
              style={{
                backgroundImage: `url(${
                  category ? category[2]?.categoryImage : ""
                })`,
              }}
              className="relative h-[290px] bg-center bg-cover bg-move-tb "
            >
              <div className="absolute bottom-10 left-10 ">
                <p className=" font-bold text-2xl">
                  {category ? category[2]?.categoryTitle : ""}
                </p>
                <div className="">
                  <p className="">
                    {category ? category[2]?.categoryDiscription : ""}
                  </p>
                  <button
                    onClick={() =>
                      navigate(`/services/${category[2]?.categoryCode}`)
                    }
                    className="mt-4 btn rounded-none bg-red-500 border-none text-white"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
            <div className="flex h-[290px] ">
              <div
                style={{
                  backgroundImage: `url(${
                    category ? category[3]?.categoryImage : ""
                  })`,
                }}
                className="relative w-6/12 bg-center bg-cover bg-move "
              >
                <div className="absolute bottom-10 left-10 ">
                  <p className=" font-bold text-2xl">
                    {category ? category[3]?.categoryTitle : ""}
                  </p>
                  <div className="">
                    <p className="">
                      {category ? category[3]?.categoryDiscription : ""}
                    </p>
                    <button
                      onClick={() =>
                        navigate(`/services/${category[3]?.categoryCode}`)
                      }
                      className="mt-4 btn rounded-none bg-red-500 border-none text-white"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundImage: `url(${
                    category ? category[4]?.categoryImage : ""
                  })`,
                }}
                className="relative w-6/12 bg-center bg-cover bg-move "
              >
                <div className="absolute bottom-10 left-10 ">
                  <p className=" font-bold text-2xl">
                    {category ? category[4]?.categoryTitle : ""}
                  </p>
                  <div className="">
                    <p className="">
                      {category ? category[4]?.categoryDiscription : ""}
                    </p>
                    <button
                      onClick={() =>
                        navigate(`/services/${category[4]?.categoryCode}`)
                      }
                      className="mt-4 btn rounded-none bg-red-500 border-none text-white"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mx-auto gap-3 mt-10 text-white ">
          {category?.map((x) => {
            return (
              <div
                key={x?._id}
                style={{
                  backgroundImage: `url(${x?.categoryImage})`,
                }}
                className="relative w-full h-[320px] md:h-[300px] sm:h-[260px] bg-center bg-cover bg-move shadow-xl"
              >
                <div className="absolute bottom-6 left-6 ">
                  <p className="font-bold text-2xl ">{x?.categoryTitle}</p>
                  <div className="mt-3">
                    {/* <p className="my-4">{x?.categoryDiscription}</p> */}
                    <button
                      onClick={() => navigate(`/services/${x?.categoryCode}`)}
                      className="btn rounded-none bg-red-500 border-none text-white shadow-xl"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="relative">
            <div
              onClick={() => navigate("/services")}
              style={{
                backgroundImage: `url(https://images.adsttc.com/media/images/5bbe/5c1d/f197/ccec/bc00/002b/newsletter/Yellowsubmarine-11.jpg?1539202073)`,
              }}
              className="relative w-full lg:h-[300px] md:h-[300px] sm:h-[260px] bg-center bg-cover bg-move shadow-xl"
            >
              <div className="absolute bottom-6 left-6 ">
                <p className="font-bold text-2xl ">More categories</p>
              </div>
            </div>
            <div
              onClick={() => navigate("/services")}
              className="transition-all ease-in-out hover:scale-90 absolute top-0 hover:cursor-pointer w-full lg:h-[300px] md:h-[300px] sm:h-[260px] flex flex-col justify-center items-start p-4 backdrop-blur-sm"
            >
              <p className="text-3xl text-center ">Browse More Categories</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HomeSection2;
