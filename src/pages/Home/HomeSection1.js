import { useAnimation, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ic1 from "../../assets/object/bgc1.webp";
import ic2 from "../../assets/object/bgc2.webp";
import ic4 from "../../assets/object/bgd2.webp";
import DOMPurify from "dompurify";
import { useQuery } from "react-query";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import Loading from "../../shared/Loading";

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
  // console.log(section2);

  const {
    isLoading,
    isError,
    data: section2,
    error,
  } = useQuery(["cpcsec2new"], async () => {
    let data = await axiosInstance.get("cpc/get");
    // Swal.close();
    let fdata = data?.data[0];
    return fdata?.whoWeAreSection;
  });

  // const [discription, setDiscription] = useState("");
  // useEffect(() => {
  //   let tem = section2?.sectionAbout?.split("imranvhaisera");

  //   if (tem !== undefined) {
  //     let result = tem[0].replace("\n", "");
  //     setDiscription(result);
  //   }
  // }, [section2]);

  // console.log(discription);

  if (isLoading) return <Loading></Loading>;

  return (
    <section
      id="hs1"
      className="w-full pt-44 pb-0 flex justify-center items-center"
    >
      <div ref={ref}>
        <motion.div
          initial={{
            x: -100,
            visibility: "hidden",
            opasity: 0,
          }}
          animate={animation}
          className="flex lg:flex-row md:flex-col sm:flex-col justify-center items-center gap-4 "
        >
          {/* writing section */}
          <div className="lg:w-5/12 md:w-full sm:w-full lg:order-1 md:order-2 sm:order-2">
            <div className="flex items-center ">
              <p className="text-sm w-3/12 tracking-widest uppercase">
                {section2?.sectionName}
              </p>
              <div className="w-6/12 border-b border-gray-400"></div>
            </div>
            <p className="text-4xl font-bold text-black mt-6 mb-8">
              {section2?.sectionTitle}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  section2?.sectionAbout?.split("imranvhaisera") !== undefined
                    ? DOMPurify.sanitize(
                        section2?.sectionAbout?.split("imranvhaisera")[0]
                      )
                    : DOMPurify.sanitize(""),
              }}
            />

            {/* <div>{discription}</div> */}

            {/* <button className="mt-16 flex items-center gap-6">
              <p className="text-red-500 font-semibold">{section2?.btnText}</p>
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
            </button> */}
          </div>
          {/* image section border border-black*/}
          <div className="lg:w-7/12 md:w-w-7/12 sm:w-full  lg:h-[600px] md:h-[540px] sm:h-[440px] flex justify-center relative lg:order-2 md:order-1 sm:order-1">
            <div
              style={{
                backgroundImage: `url(${section2?.img1})`,
              }}
              className=" h-5/6 lg:w-6/12 md:w-[300px] sm:w-[300px] rounded-tr-[30%] rounded-bl-[30%] shadow-lg bg-cover bg-center z-[5]"
            ></div>
            <div
              style={{
                backgroundImage: `url(${section2?.img2})`,
              }}
              className="lg:w-4/12 md:w-[160px] sm:w-[160px] h-3/6 rounded-tr-[30%] rounded-bl-[30%] shadow-lg bg-cover bg-center absolute bottom-0 lg:left-20 md:left-20 sm:left-8 z-[6]"
            ></div>

            <img
              className="absolute z-[5] w-[160px] h-[160px] bottom-1 left-30"
              src={ic1}
              alt=""
            />

            <div className="absolute z-[1] bottom-1 right-0 h-full flex justify-center items-center">
              <img className="w-[160px] h-[160px]" src={ic2} alt="" />
              <img className="h-full absolute" src={ic4} alt="" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeSection1;
