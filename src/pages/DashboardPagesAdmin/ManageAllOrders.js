import React, { useState } from "react";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import ErrorPage from "../../shared/ErrorPage";
import Loading from "../../shared/Loading";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";

const ManageAllOrders = () => {
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

  const handleOrderStatus = (_id, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Update the status to ${status}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .put(`order/update-status?_id=${_id}&status=${status}`)
          .then((res) => {
            console.log(res.data);
            if (res.status === 200) {
              Swal.fire(
                "Status Updated!",
                `Your order status has been updated to ${res.data.status}`,
                "success"
              ).then(() => {
                increaseChanges(changes + 1);
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: res.response.data.message || res.response.data,
              });
            }
          });
      }
    });
  };

  const handleDeleteOrder = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.delete(`order/delete?_id=${_id}`).then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            Swal.fire("Deleted!", "Order has been deleted.", "success").then(
              () => {
                increaseChanges(changes + 1);
              }
            );
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: res.response.data.message || res.response.data,
            });
          }
        });
      }
    });
  };

  // console.log(allorders);
  if (isError) return <ErrorPage msg={error}></ErrorPage>;
  if (isLoading) return <Loading msg="Loading..."></Loading>;

  return (
    <div className=" py-6 lg:px-10 md:px-10 sm:px-2  w-full">
      <p className="text-sm font-semibold ">Manage Orders</p>
      {/* allorders products */}
      <div className="overflow-auto rounded p-0 border border-gray-200 mt-4">
        <table className="border-collaspe text-xs border border-gray-300 w-full ">
          <thead>
            <tr>
              <th className="p-2 border border-gray-300 ">Service Category</th>

              <th className="p-2 border border-gray-300 ">Client Name</th>
              <th className="p-2 border border-gray-300 ">What'sapp Phone</th>
              <th className="p-2 border border-gray-300 ">Address</th>
              <th className="p-2 border border-gray-300 ">Email</th>

              <th className="p-2 border border-gray-300 ">Budget</th>
              <th className="p-2 border border-gray-300 ">Message</th>

              <th className="p-2 border border-gray-300 ">Order Status</th>

              <th className="p-2 border border-gray-300 ">
                Status Updating Buttons
              </th>
              <th className="p-2 border border-gray-300 ">Delete</th>
            </tr>
          </thead>
          <tbody>
            {allorders?.map((x, index) => {
              return (
                <tr key={index}>
                  {/* order info */}

                  <td className="p-2 border border-gray-300 ">
                    <p className="uppercase">{x?.serviceCategory}</p>
                  </td>
                  <td align="center" className="p-2 border border-gray-300">
                    {x?.buyerName}
                  </td>
                  <td align="center" className="p-2 border border-gray-300">
                    {x?.whatsappPhone}
                  </td>
                  <td align="center" className="p-2 border border-gray-300">
                    {x?.address}
                  </td>
                  <td align="center" className="p-2 border border-gray-300">
                    {x?.email}
                  </td>

                  <td align="center" className="p-2 border border-gray-300">
                    {x?.budget}
                  </td>
                  <td align="center" className="p-2 border border-gray-300">
                    {x?.clientMessage}
                  </td>
                  <td align="center" className="p-2 border border-gray-300">
                    <p
                      className={
                        x?.status === "pending"
                          ? "btn btn-xs"
                          : x?.status === "rejected"
                          ? "btn btn-xs bg-red-900 border-none text-white"
                          : x?.status === "accepted"
                          ? "btn btn-xs bg-blue-800 border-none text-white"
                          : x?.status === "processing"
                          ? "btn btn-xs bg-warning border-none text-white"
                          : x.status === "completed"
                          ? "btn btn-xs bg-success border-none text-white"
                          : "btn btn-xs"
                      }
                    >
                      {x?.status}
                    </p>
                  </td>
                  {/* BTNS FROM HERE */}

                  <td className="border border-gray-300">
                    <tr className="">
                      {/* pending */}
                      <td
                        align="center"
                        className="p-2  mx-auto content-center"
                      >
                        <button
                          onClick={() => {
                            handleOrderStatus(x?._id, "pending");
                          }}
                          className="btn btn-xs bg-gray-500 border-none text-white"
                        >
                          Pending
                        </button>
                      </td>
                      {/* accepted */}
                      <td
                        align="center"
                        className="p-2  mx-auto content-center"
                      >
                        <button
                          onClick={() => {
                            handleOrderStatus(x?._id, "accepted");
                          }}
                          className="btn btn-xs bg-blue-800 border-none text-white"
                        >
                          Accepted
                        </button>
                      </td>
                      {/* processing */}
                      <td align="center" className="p-2 mx-auto content-center">
                        <button
                          onClick={() => {
                            handleOrderStatus(x?._id, "processing");
                          }}
                          className="btn btn-xs bg-warning border-none text-white"
                        >
                          Processing
                        </button>
                      </td>
                      {/* Completed */}
                      <td
                        align="center"
                        className="p-2  mx-auto content-center"
                      >
                        <button
                          onClick={() => {
                            handleOrderStatus(x?._id, "completed");
                          }}
                          className="btn btn-xs bg-success border-none text-white"
                        >
                          Completed
                        </button>
                      </td>
                      {/* rejected */}
                      <td
                        align="center"
                        className="p-2  mx-auto content-center"
                      >
                        <button
                          onClick={() => {
                            handleOrderStatus(x?._id, "rejected");
                          }}
                          className="btn btn-xs bg-red-900 border-none text-white"
                        >
                          Rejected
                        </button>
                      </td>
                    </tr>
                  </td>

                  {/* delete */}
                  <td
                    align="center"
                    className="p-2 border border-gray-300 mx-auto content-center text-white"
                  >
                    <button
                      className="btn btn-xs bg-red-500 border-none text-white"
                      onClick={() => handleDeleteOrder(x?._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAllOrders;
