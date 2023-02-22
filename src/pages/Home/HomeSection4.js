import { useAnimation, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const HomeSection4 = () => {
  const team = [
    {
      pic: "https://media.istockphoto.com/id/1211994283/photo/portrait-of-a-confident-young-businessman.jpg?b=1&s=170667a&w=0&k=20&c=tc6qEY_rmQJVWBTpB75faKkGF4G3iHZ3J48tbhGeDKg=",
      name: "Md Imran Hossain",
      des: "ceo/founder",
    },
    {
      pic: "https://images.unsplash.com/photo-1605664042212-73d09aa18a96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8b2ZmaWNlJTIwbWFufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
      name: "Jacob Jones",
      des: "lead design",
    },
    {
      pic: "https://images.unsplash.com/photo-1605664041954-fc778c387c02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG9mZmljZSUyMG1hbnxlbnwwfHwwfHw%3D&w=1000&q=80",
      name: "Haibatullah Bin Salman",
      des: "project manager",
    },
    {
      pic: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8b2ZmaWNlJTIwbWFufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
      name: "Something Pichai",
      des: "architechture",
    },
  ];

  const { ref, inView } = useInView({ threshold: 0.25 });
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
    <section id="hs4" className="w-full pb-32">
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
            our team
          </p>
          <p className="text-4xl font-semibold text-gray-800 mt-3 mb-8 text-center">
            Meet our talent team
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center lg:gap-10 sm:gap-4 mt-16">
          {team.map((x, index) => {
            return (
              <div
                key={index}
                className="flex flex-col justify-center lg:items-start md:items-center sm:items-center"
              >
                <div
                  className="h-[260px] w-[260px] bg-cover bg-center rounded"
                  style={{
                    backgroundImage: `url(${x.pic})`,
                  }}
                ></div>

                <p className="font-semibold mt-3 mb-1"> {x.name}</p>
                <p className="text-xs uppercase tracking-widest"> {x.des}</p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default HomeSection4;
