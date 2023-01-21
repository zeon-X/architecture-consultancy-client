import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyOrdersRow1 = ({ x }) => {
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
    <div className="my-6 border border-gray-200 rounded text-sm">
      <div className="w-full grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 justify-center items-start">
        {/* order info */}
        <div className="p-4 min-h-full border-r border-gray-200">
          <p>Order Id: {x?._id}</p>
          <p className="">
            Category:
            <span className="uppercase font-semibold">
              {x?.serviceCategory}
            </span>
          </p>
          <p className="mt-3 mb-2 font-semibold underline">Request Message</p>
          <p className="p-3 bg-base-200 rounded-lg">{x?.clientMessage}</p>
          <p className="mt-3 mb-2 font-semibold underline">Review Option</p>
          <button
            disabled={x?.status !== "completed" ? true : false}
            className="btn btn-xs"
            onClick={() => navigate("/my-reviews")}
          >
            Write a Review
          </button>
        </div>
        {/* order status */}
        <div className="p-0 min-h-full flex justify-center items-center">
          <ul className="steps">
            {orderStatus?.map((status) => {
              return (
                <li
                  className={
                    status?.active === true
                      ? "step step-primary px-1"
                      : "step px-1"
                  }
                >
                  {status?.name}
                </li>
              );
            })}
          </ul>
        </div>
        {/* contact info */}
        <div className="p-4 min-h-full border-l border-gray-200">
          <p className=" mb-2 font-semibold underline">
            Provided Contact Information
          </p>
          <p>Client Name: {x?.buyerName}</p>
          <p>What'sApp/Phone: {x?.whatsappPhone}</p>
          <p>Email: {x?.email}</p>
          <p>Address: {x?.address}</p>
        </div>
      </div>
    </div>
  );
};

export default MyOrdersRow1;
