import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import MyOrdersRow1 from "../../components/MyOrdersRow/MyOrdersRow1";
import ErrorPage from "../../shared/ErrorPage";
import Loading from "../../shared/Loading";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import MyOrdersRow from "./MyOrdersRow";

const MyOrders = () => {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [changes, increaseChanges] = useState(0);
  const {
    isLoading,
    isError,
    data: myorders,
    error,
  } = useQuery(["userorders", changes], async () => {
    // let fdata = await axiosInstance.get(`order/find?_id=${userInfo?._id}`);
    let fdata = await axiosInstance.get(`order/get`);
    return fdata.data;
  });

  // console.log(purchase);
  if (isError) return <ErrorPage msg={error}></ErrorPage>;
  if (isLoading) return <Loading msg="Loading..."></Loading>;

  return (
    <div className=" py-6 lg:px-10 md:px-10 sm:px-2  w-full">
      <p className="text-sm font-semibold ">My Orders</p>
      {/* purchase products */}
      <div className="overflow-auto   rounded mt-4">
        {myorders?.map((x) => {
          return <MyOrdersRow1 key={x?._id} x={x}></MyOrdersRow1>;
        })}
      </div>
    </div>
  );
};

export default MyOrders;
