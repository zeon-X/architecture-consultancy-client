import React, { useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";

const ManageOrderRow = ({ props, changes, increaseChanges }) => {
  const {
    _id,
    productId,
    quantity,
    payment_status,
    buyer_name,
    address,
    status,
    phone,
    userId,
  } = props;
  const userInfo = JSON.parse(localStorage.getItem("user"));
  //   console.log(props);
  const handleDeleteOrder = (_id) => {
    console.log(_id);
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
        axiosInstance
          .delete(`order/delete?_id=${_id}&&userId=${userInfo?._id}`)
          .then((res) => {
            console.log(res.data);
            if (res.status === 200) {
              Swal.fire(
                "Deleted!",
                "Your order has been deleted.",
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

  return (
    <tr>
      <td align="center" className=" border border-gray-300 ">
        <img className="p-2 w-16 h-16" src={productId?.img} alt="" />
      </td>
      <td className="p-2 border border-gray-300 ">{productId?.title}</td>
      <td className="p-2 border border-gray-300 text-center">{quantity}</td>
      <td className="p-2 border border-gray-300 text-center">
        {productId?.unit_price * quantity}
      </td>

      <td className="p-2 border border-gray-300 ">{buyer_name}</td>
      <td className="p-2 border border-gray-300 ">{phone}</td>
      <td className="p-2 border border-gray-300 ">{address}</td>
      <td align="center" className="p-2 border border-gray-300 ">
        <p className="btn btn-xs ">{status}</p>
      </td>

      <td className="p-2 border border-gray-300 text-center">
        <p disabled={payment_status === "paid"} className="btn btn-xs">
          {payment_status}
        </p>
      </td>
      {/* delete */}
      <td className="p-2 border border-gray-300 text-center">
        <button
          onClick={() => handleDeleteOrder(_id)}
          disabled={payment_status === "paid" ? true : false}
          className="btn btn-xs bg-red-500 border-red-500 "
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ManageOrderRow;
