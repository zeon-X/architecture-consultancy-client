import React, { useState } from "react";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import ErrorPage from "../../shared/ErrorPage";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import { CopyToClipboard } from "react-copy-to-clipboard";
import UpdateReviewModal from "../Modals/UpdateReviewModal";
const ManageReview = () => {
  const [changes, increaseChanges] = useState(0);
  const [updateData, setUpdateData] = useState({});
  const {
    isLoading,
    isError,
    data: review,
    error,
  } = useQuery(["reviewsget", changes], async ({ changes }) => {
    console.log(changes);
    let data = await axiosInstance.get("review/get");
    Swal.close();
    return data;
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
    Swal.showLoading();
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
              <th className="p-2 border border-gray-300 ">Copy Id</th>
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
                    {x?.reviewDiscription.slice(0, 40)}
                    <span>..</span>
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
                    <label
                      htmlFor="update-review-modal"
                      className="btn btn-xs bg-warning border-none text-white"
                      onClick={() => {
                        setUpdateData(x);
                      }}
                    >
                      Update
                    </label>
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
                  <td
                    align="center"
                    className=" p-2 border  border-gray-300 mx-auto content-center"
                  >
                    <div>
                      <CopyToClipboard
                        text={x?._id}
                        onCopy={() => {
                          Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Review id has been copied",
                            showConfirmButton: false,
                            timer: 1500,
                          });
                          this.setState({ copied: true });
                        }}
                      >
                        <button
                          className="btn btn-info btn-circle scale-75 hover:scale-90"
                          type=""
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                            />
                          </svg>
                        </button>
                      </CopyToClipboard>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Update Modal Here */}
      <UpdateReviewModal
        props={updateData}
        increaseChanges={increaseChanges}
        changes={changes}
      ></UpdateReviewModal>
    </div>
  );
};

export default ManageReview;
