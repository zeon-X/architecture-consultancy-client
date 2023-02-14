import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";

// REVIEW
const HomeSection5 = () => {
  const [page, setPage] = useState(0);
  const [howmany, setHowMany] = useState(3);
  const [rd, setRD] = useState([]);
  const [changes, increaseChanges] = useState(0);

  useEffect(() => {
    let w = window.innerWidth;
    // let w = 600;

    if (w >= 1024) setHowMany(3);
    else if (w >= 768) setHowMany(2);
    else setHowMany(1);
  }, []);

  const {
    isLoading,
    isError,
    data: review,
    error,
  } = useQuery(["reviewsgethomeactive", changes], async ({ changes }) => {
    // console.log(changes);
    let data = await axiosInstance.get("review/get-active?limit=6");
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
  }, [page, review]);

  if (isLoading) Swal.showLoading();

  return (
    <section
      id="hs5"
      className="pt-36 pb-24 w-full flex flex-col justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage: `url(https://www.uii.ac.id/wp-content/uploads/2019/09/architecturevalues.jpeg)`,
      }}
    >
      <div className="">
        <p className="text-sm text-black tracking-widest uppercase text-center">
          THEY REMEMBER US
        </p>
        <p className="text-3xl font-semibold text-gray-800 mt-3 mb-8 text-center px-10">
          What’s clients say about us
        </p>
      </div>

      <div className="flex justify-center items-center gap-2 mt-10">
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
        <div className="max-w-7xl h-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 justify-center items-center ">
          {rd?.map((x, index) => {
            return (
              <div
                key={index}
                className="review-card p-10 shadow-2xl relative h-full bg-white rounded-xl min-h-[280px]"
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
                      <p className="text-xs font-semibold">{x.clientName}</p>
                      <p className="text-xs">{x.clientDesignation}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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
    </section>
  );
};

export default HomeSection5;
