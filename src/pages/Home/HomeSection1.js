import React from "react";
import hero from "../../assets/hs1/about3-bg2.jpg";

const HomeSection1 = () => {
  return (
    <section id="hs1" className="w-full py-16">
      <div className="flex">
        <div className="w-5/12">
          <div className="flex items-center ">
            <p className="text-sm w-3/12 tracking-widest uppercase">
              who we are
            </p>
            <div className="w-6/12 border-b border-gray-400"></div>
          </div>
          <p className="text-4xl font-bold text-black mt-6 mb-8">
            Where ideas meet skills
          </p>
          <p className="text-lg text-gray-400">
            Welcome to astrids Architecture Studio, a reliable business partner
            on your path to building a better looking future for all
          </p>

          <button className="mt-16 flex items-center gap-6">
            <p className="text-red-500 font-semibold">read more about us</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="red"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>
        <div className="w-7/12 flex justify-center">
          <img className="w-[400px] rounded-xl shadow-lg" src={hero} alt="" />
        </div>
      </div>
    </section>
  );
};

export default HomeSection1;
