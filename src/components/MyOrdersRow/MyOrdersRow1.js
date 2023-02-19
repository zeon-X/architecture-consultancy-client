import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitReviewModal from "../../pages/Modals/SubmitReviewModal";

const MyOrdersRow1 = ({ x, changes, increaseChanges }) => {
  //status functionalities
  const [orderStatus, setOrderStatus] = useState([
    {
      name: "pending",
      active: false,
    },
    {
      name: "accepted",
      active: false,
    },
    {
      name: "processing",
      active: false,
    },
    {
      name: "completed",
      active: false,
    },
  ]);

  useEffect(() => {
    let flag = -1;
    if (x?.status) {
      for (let i = 0; i < orderStatus.length; ++i) {
        if (orderStatus[i].name === x?.status) {
          flag = i;
          break;
        }
      }
    }
    let tem = [];
    let i = 0;
    for (i = 0; i <= flag; ++i)
      tem.push({ name: orderStatus[i].name, active: true });

    for (i; i < orderStatus.length; ++i)
      tem.push({ name: orderStatus[i].name, active: false });

    setOrderStatus(tem);
  }, [x]);
  const navigate = useNavigate();
  return (
    <div className="my-6 border border-gray-400 text-sm bg-white shadow-lg rounded-2xl">
      <div className="w-full grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 justify-center items-start">
        {/* order info */}
        <div className="p-10 min-h-full border-r border-gray-200 flex flex-col gap-2">
          <p>
            Order Id: <span className="btn btn-xs ml-2">{x?._id}</span>{" "}
          </p>
          <p className="">
            Category:
            <span className="btn btn-xs ml-2">{x?.serviceCategory}</span>
          </p>
          <p className="">
            Budget:
            <span className="ml-3 font-semibold">USD {x?.clientBudget}</span>
          </p>
          <p className="mt-3 mb-2 font-semibold underline">Request Message</p>
          <p className="p-3 bg-base-200 rounded-lg">
            {x?.clientMessage.length === 0 ? "No Message" : x?.clientMessage}
          </p>
          <p className="mt-3 mb-2 font-semibold underline">Review Option</p>
          {/* <button
            disabled={x?.status !== "completed" ? true : false}
            className="btn btn-xs"
          >
            Write a Review
          </button> */}

          <label
            disabled={
              x?.status !== "completed" || x?.reviewId !== "" ? true : false
            }
            htmlFor="submit-review-modal"
            className="btn btn-xs  text-white"
          >
            Write a Review
          </label>
          {x?.reviewId !== "" && (
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="green"
                className="w-6 h-6 mr-2"
              >
                <path
                  fillRule="evenodd"
                  d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="text-green-600 font-semibold">
                You've already reviewed this order
              </p>
            </div>
          )}
        </div>
        {/* order status */}
        <div className="py-10 min-h-full flex justify-center items-center">
          <ul className="steps">
            {orderStatus?.map((status) => {
              return (
                <li
                  className={
                    status?.active === true
                      ? "step step-neutral px-1"
                      : "step px-1"
                  }
                >
                  {status?.name}
                </li>
              );
            })}
          </ul>
        </div>
        {/* contact info  , date, status details*/}
        <div className="p-10 min-h-full border-l border-gray-200 flex flex-col gap-2">
          <p className=" mb-2 font-semibold underline">
            Provided Contact Information
          </p>
          <p>Client Name: {x?.clientName}</p>
          <p>What'sApp/Phone: {x?.clientWhatsappNum}</p>
          <p>Email: {x?.clientEmail}</p>
          <p>Other Communication Link:</p>
          <p>{x?.clientOtherComLink}</p>

          <p className="mt-2 underline">Order Dates</p>
          <p>
            Created Date : <span>{x?.createdAt?.split("T")[0]}</span>, Time :{" "}
            <span>{x?.createdAt?.split("T")[1].split(".")[0]}</span>
          </p>
          <p>
            Updated Date : <span>{x?.updatedAt?.split("T")[0]}</span>, Time :{" "}
            <span>{x?.updatedAt?.split("T")[1].split(".")[0]}</span>
          </p>

          <p className="mt-2 underline">Status & update</p>
          {x?.status === "completed" && (
            <div className="flex items-center">
              <p>Order Status:</p>
              <div className="flex items-center ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="green"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clipRule="evenodd"
                  />
                </svg>

                <p className="text-green-600 font-semibold uppercase">
                  {x?.status}
                </p>
              </div>
            </div>
          )}
          {x?.status === "rejected" && (
            <div className="flex items-center">
              <p>Order Status:</p>
              <div className="flex items-center ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="red"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clipRule="evenodd"
                  />
                </svg>

                <p className="text-red-600 font-semibold uppercase">
                  {x?.status}
                </p>
              </div>
            </div>
          )}
          {(x?.status !== "completed" || x?.status === "rejected") && (
            <p className="">
              Order Status: <span className="btn btn-xs">{x?.status}</span>{" "}
            </p>
          )}
        </div>
      </div>
      {/* Modal */}
      <SubmitReviewModal
        orderData={x}
        increaseChanges={increaseChanges}
        changes={changes}
      ></SubmitReviewModal>
    </div>
  );
};

export default MyOrdersRow1;
