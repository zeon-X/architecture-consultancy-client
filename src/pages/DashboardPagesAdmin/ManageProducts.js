import React, { useState } from "react";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import ErrorPage from "../../shared/ErrorPage";
import Loading from "../../shared/Loading";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";

const ManageProducts = () => {
  const [changes, increaseChanges] = useState(0);
  const {
    isLoading,
    isError,
    data: product,
    error,
  } = useQuery(["products", changes], async ({ changes }) => {
    console.log(changes);
    return await axiosInstance.get("product/get");
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
        axiosInstance.delete(`product/delete?_id=${_id}`).then((res) => {
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

  if (isLoading) return <Loading msg="Loading..."></Loading>;

  return (
    <div className="py-6 lg:px-10 md:px-10 sm:px-2  w-full">
      <p className="text-sm font-semibold ">Manage Products</p>
      {/* purchase products */}
      <div className="overflow-auto   rounded mt-4">
        <table className="border-collaspe text-xs border border-gray-300 w-full ">
          <thead>
            <tr>
              <th className="p-2 border border-gray-300 ">Image</th>
              <th className="p-2 border border-gray-300 ">Title</th>
              <th className="p-2 border border-gray-300 ">Unit price</th>
              <th className="p-2 border border-gray-300 ">MCQ</th>
              <th className="p-2 border border-gray-300 ">stock</th>
              <th className="p-2 border border-gray-300 ">product _id</th>
              <th className="p-2 border border-gray-300 ">Details</th>
              <th className="p-2 border border-gray-300 ">Update</th>
              <th className="p-2 border border-gray-300 ">Delete</th>
            </tr>
          </thead>
          <tbody>
            {product?.data?.map((x, index) => {
              return (
                <tr key={index}>
                  {/* product discription */}
                  <td align="center" className="p-2 border border-gray-300">
                    <img className=" w-16 h-16" src={x?.img} alt="" />
                  </td>
                  <td className="p-2 border border-gray-300 ">{x?.title}</td>
                  <td align="center" className="p-2 border border-gray-300">
                    {x?.unit_price}
                  </td>
                  <td align="center" className="p-2 border border-gray-300">
                    {x?.mcq}
                  </td>
                  <td align="center" className="p-2 border border-gray-300">
                    {x?.stock}
                  </td>
                  <td align="center" className="p-2 border border-gray-300">
                    {x?._id}
                  </td>
                  {/* BTNS FROM HERE */}
                  {/* details */}
                  <td
                    align="center"
                    className=" p-2 border  border-gray-300 mx-auto content-center"
                  >
                    <button className="btn btn-xs bg-success border-none text-white">
                      Details
                    </button>
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
                      onClick={() => handleDeleteProduct(x?._id)}
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

export default ManageProducts;
