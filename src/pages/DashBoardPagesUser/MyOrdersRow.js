import React, { useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";

const MyOrdersRow = ({ props, changes, increaseChanges }) => {
  const [btnActive, setBtnActive] = useState(false);
  const { _id, productId, quantity, payment_status } = props;
  const userInfo = JSON.parse(localStorage.getItem("user"));
  //   console.log(props);
  const [q, setQ] = useState(quantity);
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
  const handleUpdateOrder = (_id) => {
    console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update the order!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .put(`order/update?_id=${_id}&&userId=${userInfo?._id}`, {
            amount: q * productId?.unit_price,
            quantity: q,
          })
          .then((res) => {
            console.log(res.data);
            if (res.status === 200) {
              Swal.fire(
                "Updated!",
                "Your order has been updated.",
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
      <td className="p-2 border border-gray-300 ">{productId?.mcq}</td>
      <td className="p-2 border border-gray-300 ">{productId?.stock}</td>
      <td className="p-2 border border-gray-300 content-between text-center">
        {productId?.unit_price}
      </td>
      <td className="p-2 border border-gray-300 text-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          type="number"
          min={productId.mcq}
          max={productId.stock}
          placeholder="Quantity"
          className="input input-bordered w-24 text-xs"
          disabled={payment_status === "paid" ? true : false}
        />
      </td>
      <td className="p-2 border border-gray-300 text-center">
        {productId?.unit_price * q}
      </td>
      <td className="p-2 border border-gray-300 text-center">
        {payment_status === "paid" ? (
          <button disabled className="btn btn-xs ">
            paid
          </button>
        ) : (
          <button className="btn btn-xs btn-success"> pay </button>
        )}
      </td>
      {/* update */}
      <td align="center" className="mx-auto broder border-gray-300 p-2">
        <button
          onClick={() => handleUpdateOrder(_id)}
          disabled={
            q !== quantity && q > productId.mcq && q < productId.stock
              ? false
              : true
          }
          className="btn btn-xs  btn-success "
        >
          update
        </button>
      </td>
      {/* delete */}
      <td
        align="center"
        className=" border border-gray-300 mx-auto content-center p-2"
      >
        <button
          onClick={() => handleDeleteOrder(_id)}
          disabled={payment_status === "paid" ? true : false}
          className="btn btn-xs bg-red-500 border-red-500 "
        >
          Cancle
        </button>
      </td>
    </tr>
  );
};

export default MyOrdersRow;
