import DOMPurify from "dompurify";
import { useAnimation, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useQuery } from "react-query";
import Loading from "../../shared/Loading";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";

const HomeSection1Additional = ({ props }) => {
  const { ref, inView } = useInView({ threshold: 0.5 });
  const animation = useAnimation();
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
    data: section2data,
    error,
  } = useQuery(["cpcsec2new"], async () => {
    let data = await axiosInstance.get("cpc/get");
    // Swal.close();
    // console.log(data?.data[0]?.whoWeAreSection);
    let fdata = data?.data[0]?.whoWeAreSection;
    return fdata;
  });

  // console.log(section2data?.sectionAbout?.split("imranvhaisera"));

  if (isLoading) return <Loading></Loading>;

  return (
    <div ref={ref} className="mt-10 max-w-7xl w-full ">
      <motion.div
        // initial={{
        //   x: -100,
        //   visibility: "hidden",
        //   opasity: 0,
        // }}
        // animate={animation}
        className=" "
      >
        <div
          dangerouslySetInnerHTML={{
            __html:
              section2data?.sectionAbout?.split("imranvhaisera") !== undefined
                ? DOMPurify.sanitize(
                    section2data?.sectionAbout?.split("imranvhaisera")[props]
                  )
                : DOMPurify.sanitize(""),
          }}
        />
      </motion.div>
    </div>
  );
};

export default HomeSection1Additional;
