import { useAnimation, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import imran from "../../assets/team/imran.webp";
import mahraj from "../../assets/team/maraj.jpg";
import waliullah from "../../assets/team/waliullah_sajib.jpg";

const HomeSection4 = () => {
  const team = [
    {
      pic: imran,
      name: "Md Imran Hossain",
      des: "Founder and CEO",
    },
    {
      pic: mahraj,
      name: "Maraj Mahmud",
      des: "Chief architect",
    },
    {
      pic: waliullah,
      name: "Waliullah Sajib",
      des: "Interior Design specialist ",
    },
    // {
    //   pic: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    //   name: "Something Pichai",
    //   des: "architechture",
    // },
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
        <div className="my-16">
          <p className="text-sm text-black tracking-widest uppercase text-center">
            our team
          </p>
          <p className="text-4xl font-semibold text-gray-800 mt-3 mb-8 text-center">
            Meet our talent team
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center lg:gap-16 sm:gap-4 mt-16">
          {team.map((x, index) => {
            return (
              <div
                key={index}
                className="flex flex-col justify-center items-center"
              >
                <img
                  className="h-[260px] w-[260px] bg-cover bg-center rounded-[50%]  shadow-lg"
                  src={x.pic}
                  alt=""
                />

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
