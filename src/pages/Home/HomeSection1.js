import { useAnimation, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const HomeSection1 = () => {
  const { ref, inView } = useInView({ threshold: 0.5 });
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
    <section id="hs1" className="w-full my-32 flex justify-center items-center">
      <div ref={ref}>
        <motion.div
          initial={{
            x: -100,
            visibility: "hidden",
            opasity: 0,
          }}
          animate={animation}
          className="flex lg:flex-row md:flex-row sm:flex-col gap-10"
        >
          {/* writing section */}
          <div className="lg:w-5/12 md:w-5/12 sm:w-full lg:order-1 md:order-1 sm:order-2">
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
              Welcome to astrids Architecture Studio, a reliable business
              partner on your path to building a better looking future for all
              Welcome to astrids Architecture Studio, a reliable business
              partner on your path to building a better looking future for all
              Welcome to astrids Architecture Studio, a reliable business
              partner on your path to building a better looking future for all
              Welcome to astrids Architecture Studio, a reliable business
              partner on your path to building a better looking future for all
              Welcome to astrids Architecture Studio, a reliable business
              partner on your path to building a better looking future for all
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
          {/* image section */}
          <div
            style={{
              backgroundImage: `url(http://done3d.com/wp-content/uploads/2018/11/Office_building_design_1.jpg)`,
            }}
            className="lg:w-7/12 md:w-7/12 sm:w-full rounded-2xl shadow-2xl bg-cover bg-center flex justify-center lg:order-2 md:order-2 sm:order-1"
          >
            {/* <img className="w-full rounded-xl shadow-lg" src={hero} alt="" /> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeSection1;
