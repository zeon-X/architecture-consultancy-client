import { useAnimation, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";

const SeeAllService = () => {
  const navigate = useNavigate();
  const { data: category } = useQuery(["allservicecategorys"], async () => {
    let data = await axiosInstance.get("service-category/get");
    data = data?.data;
    data = data;
    return data;
  });

  const [cat, setCat] = useState([]);

  useEffect(() => {
    let tem = category;
    let main = tem?.filter((x) => x?.parentId === null);
    let sub = tem?.filter((x) => x?.parentId !== null);

    // console.log(main);
    // console.log(sub);

    main?.map((x) => {
      let subCat = sub?.filter((y) => y?.parentId === x?._id);
      x.sub = subCat;
      return 1;
    });
    setCat(main);
    // console.log(main);
  }, [category]);

  // console.log(category);

  return (
    <motion.div
      initial={{
        x: -100,
        opasity: 0,
        visibility: "hidden",
      }}
      animate={{
        x: 0,
        opacity: 1,
        visibility: "visible",
        transition: {
          type: "spring",
          delay: 0.75,
          duration: 0.75,
          bounce: 0.1,
        },
      }}
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col  items-center min-h-screen my-10">
        {/* intro */}
        <div className="">
          <p className="text-sm text-black tracking-widest uppercase text-center">
            our services
          </p>
          <p className="text-4xl font-semibold text-gray-800 mt-3 mb-8 text-center">
            Here we share all our services
          </p>
        </div>

        {/* cats service */}
        <div className="w-full">
          <div className="w-full mt-10 ">
            {cat?.map((x, index) => {
              return (
                <div key={index} className="my-16">
                  <div
                    className={
                      index % 2 === 0
                        ? "flex gap-6 lg:flex-row md:flex-row sm:flex-col justify-center items-center"
                        : "flex gap-6 lg:flex-row-reverse md:flex-row-reverse  sm:flex-col justify-center items-center"
                    }
                  >
                    <div
                      key={x?._id}
                      style={{
                        backgroundImage: `url(${x?.categoryImage})`,
                      }}
                      className="relative w-full h-[360px] lg:w-7/12 md:w-7/12 sm:w-full bg-center bg-cover "
                    ></div>

                    <div className="lg:w-5/12 md:w-5/12 sm:w-full">
                      <p className="font-bold text-2xl">{x?.categoryTitle}</p>
                      <p className="my-4">{x?.categoryDiscription}</p>
                      <button
                        onClick={() => navigate(`/services/${x?.categoryCode}`)}
                        className="btn rounded-none bg-red-500 border-none text-white"
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                  {x?.sub?.length !== 0 && (
                    <div className="w-full grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 mx-auto gap-3 mt-10 ">
                      {x?.sub?.map((subCategory) => {
                        return (
                          <div key={subCategory?._id}>
                            <div className=" ">
                              <div
                                style={{
                                  backgroundImage: `url(${subCategory?.categoryImage})`,
                                }}
                                className="relative w-full h-[320px] md:h-[300px] sm:h-[260px] bg-center bg-cover bg-move shadow-xl "
                              >
                                <div className="absolute bottom-6 left-6 ">
                                  <p className="font-bold text-2xl  text-white">
                                    {subCategory?.categoryTitle}
                                  </p>
                                  <button
                                    onClick={() =>
                                      navigate(
                                        `/services/${subCategory?.categoryCode}`
                                      )
                                    }
                                    className="btn rounded-none bg-red-500 border-none text-white shadow-xl mt-6"
                                  >
                                    Read More
                                  </button>
                                </div>
                              </div>

                              <p className="my-4">
                                {subCategory?.categoryDiscription}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SeeAllService;
