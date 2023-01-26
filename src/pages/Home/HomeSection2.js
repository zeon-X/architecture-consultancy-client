import React from "react";

const HomeSection2 = () => {
  return (
    <section
      id="hs2"
      className="w-full pt-36 pb-16 flex flex-col justify-center items-center"
    >
      {/* heading */}
      <div className="w-full flex justify-between items-center lg:px-16 md:px-10 sm:px-2">
        <p className="text-4xl font-bold text-black">What we do</p>
        <button className="flex items-center gap-6">
          <p className="text-black ">see more service</p>
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
        </button>
      </div>

      {/* categories */}
      <div className="w-full flex h-[580px] mt-10 text-white">
        <div
          style={{ backgroundImage: `url(https://i.ibb.co/T2DNyxw/p.jpg)` }}
          className="relative w-3/12 bg-center bg-cover bg-move transition-all ease-in-out"
        >
          <p className="absolute bottom-10 left-10 font-bold text-2xl">
            Planning
          </p>
        </div>
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
          <div
            style={{ backgroundImage: `url(https://i.ibb.co/Px8DvhP/e.jpg)` }}
            className="relative h-[290px] bg-center bg-cover bg-move-tb transition-all ease-in-out"
          >
            <p className="absolute bottom-10 left-10 font-bold text-2xl">
              Exterior
            </p>
          </div>
          <div className="flex h-[290px] ">
            <div
              style={{ backgroundImage: `url(https://i.ibb.co/D7T3jLZ/d.jpg)` }}
              className="relative w-6/12 bg-center bg-cover bg-move transition-all ease-in-out"
            >
              <p className="absolute bottom-10 left-10 font-bold text-2xl">
                Decrotion
              </p>
            </div>
            <div
              style={{ backgroundImage: `url(https://i.ibb.co/BV9rvsQ/c.jpg)` }}
              className="relative w-6/12 bg-center bg-cover bg-move transition-all ease-in-out"
            >
              <p className="absolute bottom-10 left-10 font-bold text-2xl">
                Construction
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection2;
