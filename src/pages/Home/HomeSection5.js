import { useAnimation, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import rc from "../../assets/reviewcover/rc.webp";

// REVIEW
const HomeSection5 = () => {
  const [page, setPage] = useState(0);
  const [howmany, setHowMany] = useState(3);
  const [rd, setRD] = useState([]);

  let w = window.innerWidth;
  useEffect(() => {
    if (w >= 1024) setHowMany(3);
    else if (w >= 768) setHowMany(2);
    else setHowMany(1);
  }, []);

  const {
    isLoading,
    isError,
    data: review,
    error,
  } = useQuery(["reviewsgethomeactive"], async () => {
    let data = await axiosInstance.get("review/get-active?limit=9");
    Swal.close();
    return data?.data;
  });

  useEffect(() => {
    if (review) {
      let tem = [];
      for (let i = page; i < Math.min(page + howmany, review?.length); ++i) {
        tem.push(review[i]);
      }
      setRD(tem);
    }

    // setRD(review);
  }, [page, review]);

  const { ref, inView } = useInView({ threshold: 0.4 });
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
    <section
      id="whats-client-say"
      className="py-44 w-full flex flex-col justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage: `url(https://static5.depositphotos.com/1024166/489/i/600/depositphotos_4892884-stock-photo-abstract-architectural-background-abstract-tunnel.jpg)`,
      }}
    >
      <motion.div
        initial={{
          x: -100,
          visibility: "hidden",
          opasity: 0,
        }}
        animate={animation}
        ref={ref}
      >
        <div className="">
          <p className="text-sm text-black tracking-widest uppercase text-center">
            THEY REMEMBER US
          </p>
          <p className="text-3xl font-semibold text-gray-800 mt-3 mb-8 text-center px-10">
            What’s clients say about us
          </p>
        </div>

        <div className="flex justify-center items-center gap-2 mt-10 ">
          {/* LEFT NEV BTN */}
          <button
            onClick={() => {
              if (page !== 0) setPage(page - 1);
            }}
            className=""
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 hover:bg-black hover:text-white rounded-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          {/* REVIEW DISPLAY */}

          {/*  */}

          {isLoading === true ? (
            <div className="h-[600px] flex justify-center items-center max-w-7xl w-full">
              <button className="btn loading">loading</button>
            </div>
          ) : (
            <div
              // drag="x"
              // dragConstraints={{
              //   left: -1 * (384 * (rd?.length - 1) - w / 2),
              //   right: 1 * (384 * (rd?.length - 1) - w / 2),
              // }}
              className="h-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 justify-center items-center overflow-hidden"
            >
              {rd?.map((x, index) => {
                return (
                  <div
                    key={index}
                    className="review-card lg:w-[360px] md:w-[360px] sm:w-[320px] p-10 shadow-2xl relative h-full bg-white rounded-xl min-h-[280px]"
                  >
                    {/* rebiew heading  */}
                    <p className="font-semibold uppercase tracking-wide">
                      {x?.reviewTitle}
                    </p>
                    {/* review details  */}
                    <p className="text-sm text-gray-500 mt-3 pb-20">
                      <i>{x?.reviewDiscription?.slice(0, 250)}</i>
                    </p>
                    <div className="absolute bottom-10 w-9/12">
                      {/* border */}
                      <div className="border-b border-gray-300 mt-8 mb-4 w-full"></div>

                      {/* client info */}
                      <div className="flex gap-3 items-center ">
                        <img
                          className="rounded-full w-9"
                          src={
                            x?.clientImg
                              ? x?.clientImg
                              : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          }
                          alt=""
                        />

                        <div>
                          <p className="text-xs font-semibold">
                            {x.clientName}
                          </p>
                          <p className="text-xs">{x.clientDesignation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* RIGHT NEV BTN */}
          <button
            onClick={() => {
              if (page + 3 < Math.min(9, review?.length)) setPage(page + 1);
            }}
            className=""
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10  hover:bg-black hover:text-white rounded-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        {/*
       <div className="mt-10 flex gap-1 justify-center items-center">
        <div className="border-4 border-gray-300 rounded-2xl w-[40px] shadow-xl"></div>
        <div className="border-4 border-gray-300 rounded-2xl w-[10px] shadow-xl"></div>
        <div className="border-4 border-gray-300 rounded-2xl w-[10px] shadow-xl"></div>
      </div> 
      */}
      </motion.div>
    </section>
  );
};

export default HomeSection5;
