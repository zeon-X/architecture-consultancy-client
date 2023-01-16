import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
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
    data: purchase,
    error,
  } = useQuery(["userorders", changes], async () => {
    let fdata = await axiosInstance.get(`order/find?_id=${userInfo?._id}`);
    return fdata.data;
  });

  const [q, setQ] = useState(0);

  // console.log(purchase);
  if (isError) return <ErrorPage msg={error}></ErrorPage>;
  if (isLoading) return <Loading msg="Loading..."></Loading>;

  return (
    <div className=" py-6 lg:px-10 md:px-10 sm:px-2  w-full">
      <p className="text-sm font-semibold ">My Orders</p>
      {/* purchase products */}
      <div className="overflow-auto   rounded mt-4">
        <table className="border-collaspe text-xs border border-gray-300 w-full ">
          <thead>
            <tr>
              <th className="p-2 border border-gray-300 ">Image</th>
              <th className="p-2 border border-gray-300 ">Product</th>
              <th className="p-2 border border-gray-300 ">MCQ</th>
              <th className="p-2 border border-gray-300 ">Available</th>

              <th className="p-2 border border-gray-300 ">Price</th>
              <th className="p-2 border border-gray-300 ">Quantity</th>
              <th className="p-2 border border-gray-300 ">Total</th>

              <th className="p-2 border border-gray-300 ">Payment</th>
              <th className="p-2 border border-gray-300 ">Update</th>
              <th className="p-2 border border-gray-300 ">Remove</th>
            </tr>
          </thead>
          <tbody>
            {purchase.map((x, index) => {
              return (
                <MyOrdersRow
                  key={index}
                  props={x}
                  changes={changes}
                  increaseChanges={increaseChanges}
                ></MyOrdersRow>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
