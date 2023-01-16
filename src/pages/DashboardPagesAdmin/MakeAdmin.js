import React, { useState } from "react";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import ErrorPage from "../../shared/ErrorPage";
import Loading from "../../shared/Loading";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";

const MakeAdmin = () => {
  const [changes, increaseChanges] = useState(0);
  const {
    isLoading,
    isError,
    data: users,
    error,
  } = useQuery(["users", changes], async ({ changes }) => {
    console.log(changes);
    return await axiosInstance.get("user/get");
  });

  if (isError) return <ErrorPage msg={error}></ErrorPage>;

  const handleDeleteProduct = (_id) => {
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
        axiosInstance.delete(`user/delete?_id=${_id}`).then((res) => {
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

  const handleMakeAdmin = (_id, email) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to make ${email} as admin!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.put(`user/make-admin?_id=${_id}`).then((res) => {
          // console.log(res);
          if (res.status === 200) {
            Swal.fire(
              "Congratulations!",
              `You made ${email} a admin!`,
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

  if (isLoading) return <Loading msg="Loading..."></Loading>;

  return (
    <div className="py-6 lg:px-10 md:px-10 sm:px-2  w-full">
      <p className="text-sm font-semibold ">Manage Users</p>
      {/* purchase products */}
      <div className="overflow-auto   rounded mt-4">
        <table className="border-collaspe text-xs border border-gray-300 w-full ">
          <thead>
            <tr>
              <th className="p-2 border border-gray-300 ">Profile Pic</th>
              <th className="p-2 border border-gray-300 ">Name</th>
              <th className="p-2 border border-gray-300 ">Phone</th>

              <th className="p-2 border border-gray-300 ">Role</th>
              <th className="p-2 border border-gray-300 ">Make Admin</th>

              <th className="p-2 border border-gray-300 ">Email</th>

              <th className="p-2 border border-gray-300 ">Details</th>
              <th className="p-2 border border-gray-300 ">Update</th>
              <th className="p-2 border border-gray-300 ">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users?.data?.map((x, index) => {
              return (
                <tr key={index}>
                  {/* product discription */}
                  <td align="center" className="p-2 border border-gray-300">
                    <div className="avatar">
                      <div className="w-14 h-14  rounded-full">
                        <img src={x?.profile_pic} alt="" />
                      </div>
                    </div>
                  </td>
                  <td className="p-2 border border-gray-300 ">{x?.name}</td>
                  <td className="p-2 border border-gray-300">{x?.phone}</td>
                  <td align="center" className="p-2 border border-gray-300">
                    <p className={x?.role === "admin" && "badge"}>{x?.role}</p>
                  </td>
                  {/* make admin btn*/}
                  <td
                    align="center"
                    className="p-2 border border-gray-300 mx-auto content-center"
                  >
                    <button
                      onClick={() => handleMakeAdmin(x?._id, x?.email)}
                      className="btn btn-circle btn-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                    </button>
                  </td>
                  <td className="p-2 border border-gray-300">{x?.email}</td>

                  {/* BTNS FROM HERE */}

                  {/* details */}
                  <td
                    align="center"
                    className="p-2 border border-gray-300 mx-auto content-center"
                  >
                    <p className="btn btn-xs bg-green-600 border-none text-white">
                      Details
                    </p>
                  </td>
                  {/* update */}
                  <td
                    align="center"
                    className="p-2 border  border-gray-300 mx-auto content-center"
                  >
                    <p className="btn btn-xs bg-warning border-none text-white">
                      Update
                    </p>
                  </td>
                  {/* delete */}
                  <td
                    align="center"
                    className="p-2 border  border-gray-300 mx-auto content-center"
                  >
                    <p
                      onClick={() => handleDeleteProduct(x?._id)}
                      className="btn btn-xs bg-red-500 border-none text-white"
                    >
                      Delete
                    </p>
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

export default MakeAdmin;
