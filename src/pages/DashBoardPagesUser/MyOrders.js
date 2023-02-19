import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import MyOrdersRow1 from "../../components/MyOrdersRow/MyOrdersRow1";
import ErrorPage from "../../shared/ErrorPage";
import Loading from "../../shared/Loading";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import MyOrdersRow from "./MyOrdersRow";
import { useAnimation, motion } from "framer-motion";

const MyOrders = () => {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [changes, increaseChanges] = useState(0);
  const {
    isLoading,
    isError,
    data: myorders,
    error,
  } = useQuery(["userorders", changes], async () => {
    let fdata = await axiosInstance.get(
      `order/find-by-user?_id=${userInfo?._id}`
    );
    // let fdata = await axiosInstance.get(`order/get`);
    Swal.close();
    return fdata.data;
  });

  // console.log(purchase);
  if (isError) return <ErrorPage msg={error}></ErrorPage>;
  if (isLoading) return Swal.showLoading();

  return (
    <motion.div
      initial={{
        x: "-100vh",
        opasity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
        transition: {
          type: "spring",
          bounce: 0.1,
          duration: 1,
        },
      }}
      className="max-w-7xl min-h-screen mx-auto py-6 lg:px-10 md:px-10 sm:px-2  w-full"
    >
      <p className="text-lg font-semibold mt-2">My All Orders</p>
      {/* purchase products */}
      <div className="overflow-auto flex flex-col-reverse mt-2 ">
        {myorders?.map((x, index) => {
          return (
            <MyOrdersRow1
              key={index}
              x={x}
              increaseChanges={increaseChanges}
              changes={changes}
            ></MyOrdersRow1>
          );
        })}
      </div>
    </motion.div>
  );
};

export default MyOrders;
