import React, { useState } from "react";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import ErrorPage from "../../shared/ErrorPage";
import Loading from "../../shared/Loading";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";

const ManageReview = () => {
  const [changes, increaseChanges] = useState(0);
  const {
    isLoading,
    isError,
    data: review,
    error,
  } = useQuery(["reviewsget", changes], async ({ changes }) => {
    console.log(changes);
    return await axiosInstance.get("review/get");
  });

  if (isError) return <ErrorPage msg={error}></ErrorPage>;

  const handleReviewStatus = async (_id, status) => {
    let updatedStatus = status === "pending" ? "accepted" : "pending";
    await axiosInstance
      .put(`review/update-status?_id=${_id}&status=${updatedStatus}`)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          Swal.fire(
            "Status Updated!",
            "Your review status has been updated",
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
  };

  const handleDeleteReview = (_id) => {
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
        axiosInstance.delete(`review/delete?_id=${_id}`).then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            Swal.fire(
              "Deleted!",
              "Your file has been deleted.",
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
  // console.log(review);
  if (isLoading) {
    <Loading msg={"loading.."}></Loading>;
  }

  return (
    <div className="py-6 lg:px-10 md:px-10 sm:px-2  w-full">
      <p className="text-sm font-semibold ">Manage Review</p>
      {/* purchase reviews */}
      <div className="overflow-auto   rounded mt-4">
        <table className="border-collaspe text-xs border border-gray-300 w-full ">
          <thead>
            <tr>
              <th className="p-2 border border-gray-300 ">Client Image</th>
              <th className="p-2 border border-gray-300 ">Client Name</th>
              <th className="p-2 border border-gray-300 ">Client Des.</th>

              <th className="p-2 border border-gray-300 ">Review Title</th>
              <th className="p-2 border border-gray-300 ">Review Dis. </th>
              <th className="p-2 border border-gray-300 ">Status</th>
              <th className="p-2 border border-gray-300 ">Update</th>
              <th className="p-2 border border-gray-300 ">Delete</th>
              <th className="p-2 border border-gray-300 ">Details</th>
            </tr>
          </thead>
          <tbody>
            {review?.data?.map((x, index) => {
              return (
                <tr key={index}>
                  {/* review discription */}
                  <td align="center" className="p-1 border border-gray-300">
                    <img className=" w-16 h-16" src={x?.clientImg} alt="" />
                  </td>
                  <td className="p-2 border border-gray-300 ">
                    {x?.clientName}
                  </td>
                  <td align="center" className="p-2 border border-gray-300">
                    {x?.clientDesignation}
                  </td>

                  <td align="center" className="p-2 border border-gray-300">
                    {x?.reviewTitle}
                  </td>
                  <td align="center" className="p-2 border border-gray-300">
                    {x?.reviewDiscription}
                  </td>
                  {/* BTNS FROM HERE */}

                  {/* status */}
                  <td
                    align="center"
                    className="p-2 border  border-gray-300 mx-auto content-center"
                  >
                    <input
                      type="checkbox"
                      className="toggle"
                      checked={x?.status === "accepted" ? true : false}
                      onClick={() => handleReviewStatus(x?._id, x?.status)}
                    />
                  </td>
                  {/* update */}
                  <td
                    align="center"
                    className="p-2 border  border-gray-300 mx-auto content-center"
                  >
                    <button className="btn btn-xs bg-warning border-none text-white">
                      Update
                    </button>
                  </td>
                  {/* delete */}
                  <td
                    align="center"
                    className="p-2 border border-gray-300 mx-auto content-center text-white"
                  >
                    <button
                      className="btn btn-xs bg-red-500 border-none "
                      onClick={() => handleDeleteReview(x?._id)}
                    >
                      Delete
                    </button>
                  </td>
                  {/* details */}
                  <td
                    align="center"
                    className=" p-2 border  border-gray-300 mx-auto content-center"
                  >
                    <button className="btn btn-xs bg-success border-none text-white">
                      Details
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

export default ManageReview;
