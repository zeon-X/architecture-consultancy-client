import { useAnimation, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const HomeSection2 = () => {
  const { ref, inView } = useInView({ threshold: 0.3 });
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
    <section ref={ref} id="hs2" className="w-full pt-36 pb-16 ">
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
        <div className="w-full flex lg:flex-row md:flex-row sm:flex-col justify-between lg:items-center md:items-center sm:items-start lg:px-16 md:px-10 sm:px-2">
          <p className="text-3xl font-bold text-black">What we do</p>
          <button className="flex items-center gap-2 text-sm uppercase mt-4 hover:text-red-500">
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
        <div className="w-full lg:flex md:hidden sm:hidden h-[580px] mt-6 text-white ">
          {/* planning */}
          <div
            style={{ backgroundImage: `url(https://i.ibb.co/T2DNyxw/p.jpg)` }}
            className="relative w-3/12 bg-center bg-cover bg-move transition-all ease-in-out"
          >
            <p className="absolute bottom-10 left-10 font-bold text-2xl">
              Planning
            </p>
          </div>
          {/* interior */}
          <div
            style={{
              backgroundImage: `url(https://images.pexels.com/photos/10936675/pexels-photo-10936675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
            }}
            className="relative w-3/12 bg-center bg-cover bg-move transition-all ease-in-out"
          >
            <p className="absolute bottom-10 left-10 font-bold text-2xl">
              Interior
            </p>
          </div>

          <div className="w-6/12 flex flex-col justify-evenly">
            {/* exterior */}
            <div
              style={{ backgroundImage: `url(https://i.ibb.co/Px8DvhP/e.jpg)` }}
              className="relative h-[290px] bg-center bg-cover bg-move-tb transition-all ease-in-out"
            >
              <p className="absolute bottom-10 left-10 font-bold text-2xl">
                Exterior
              </p>
            </div>
            <div className="flex h-[290px] ">
              {/* decor */}
              <div
                style={{
                  backgroundImage: `url(https://i.ibb.co/D7T3jLZ/d.jpg)`,
                }}
                className="relative w-6/12 bg-center bg-cover bg-move transition-all ease-in-out"
              >
                <p className="absolute bottom-10 left-10 font-bold text-2xl">
                  Decrotion
                </p>
              </div>
              {/* construction */}
              <div
                style={{
                  backgroundImage: `url(https://i.ibb.co/BV9rvsQ/c.jpg)`,
                }}
                className="relative w-6/12 bg-center bg-cover bg-move transition-all ease-in-out"
              >
                <p className="absolute bottom-10 left-10 font-bold text-2xl">
                  Construction
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* main categories article MOBILE */}
        <div className="w-full lg:hidden md:flex sm:flex flex-wrap mx-auto gap-3 mt-10 text-white ">
          {/* planning */}
          <div
            style={{ backgroundImage: `url(https://i.ibb.co/T2DNyxw/p.jpg)` }}
            className="relative w-full h-[420px] bg-center bg-cover bg-move transition-all ease-in-out"
          >
            <p className="absolute bottom-10 left-10 font-bold text-2xl">
              Planning
            </p>
          </div>
          {/* interior */}
          <div
            style={{
              backgroundImage: `url(https://images.pexels.com/photos/10936675/pexels-photo-10936675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
            }}
            className="relative w-full h-[420px]  bg-center bg-cover bg-move transition-all ease-in-out"
          >
            <p className="absolute bottom-10 left-10 font-bold text-2xl">
              Interior
            </p>
          </div>
          {/* exterior */}
          <div
            style={{ backgroundImage: `url(https://i.ibb.co/Px8DvhP/e.jpg)` }}
            className="relative w-full h-[420px]  bg-center bg-cover bg-move-tb transition-all ease-in-out"
          >
            <p className="absolute bottom-10 left-10 font-bold text-2xl">
              Exterior
            </p>
          </div>
          {/* decor */}
          <div
            style={{ backgroundImage: `url(https://i.ibb.co/D7T3jLZ/d.jpg)` }}
            className="relative w-full h-[420px]  bg-center bg-cover bg-move transition-all ease-in-out"
          >
            <p className="absolute bottom-10 left-10 font-bold text-2xl">
              Decrotion
            </p>
          </div>
          {/* construction */}
          <div
            style={{ backgroundImage: `url(https://i.ibb.co/BV9rvsQ/c.jpg)` }}
            className="relative w-full h-[420px]  bg-center bg-cover bg-move transition-all ease-in-out"
          >
            <p className="absolute bottom-10 left-10 font-bold text-2xl">
              Construction
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HomeSection2;
