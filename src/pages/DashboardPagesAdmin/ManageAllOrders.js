import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ErrorPage from "../../shared/ErrorPage";
import Loading from "../../shared/Loading";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import ManageOrderRow from "./ManageOrderRow";

const ManageAllOrders = () => {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [changes, increaseChanges] = useState(0);
  const {
    isLoading,
    isError,
    data: allorders,
    error,
  } = useQuery(["adminorders", changes], async () => {
    let fdata = await axiosInstance.get(`order/get`);
    console.log(fdata.data);
    return fdata.data;
  });

  const [q, setQ] = useState(0);

  // console.log(allorders);
  if (isError) return <ErrorPage msg={error}></ErrorPage>;
  if (isLoading) return <Loading msg="Loading..."></Loading>;

  return (
    <div className=" py-6 lg:px-10 md:px-10 sm:px-2  w-full">
      <p className="text-sm font-semibold ">Manage Orders</p>
      {/* allorders products */}
      <div className="overflow-auto   rounded mt-4">
        <table className="border-collaspe text-xs border border-gray-300 w-full ">
          <thead>
            <tr>
              <th className="p-2 border border-gray-300 ">Image</th>
              <th className="p-2 border border-gray-300 ">Product</th>
              <th className="p-2 border border-gray-300 ">Quantity</th>
              <th className="p-2 border border-gray-300 ">Total</th>
              <th className="p-2 border border-gray-300 ">Buyer Name</th>
              <th className="p-2 border border-gray-300 ">Phone</th>

              <th className="p-2 border border-gray-300 ">Delivery Address</th>

              <th className="p-2 border border-gray-300 ">Order Status</th>

              <th className="p-2 border border-gray-300 ">Payment Status</th>

              <th className="p-2 border border-gray-300 ">Remove</th>
            </tr>
          </thead>
          <tbody>
            {allorders.map((x, index) => {
              return (
                <ManageOrderRow
                  key={index}
                  props={x}
                  changes={changes}
                  increaseChanges={increaseChanges}
                ></ManageOrderRow>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAllOrders;
