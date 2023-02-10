import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ErrorPage from "../../shared/ErrorPage";
import Loading from "../../shared/Loading";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import { useParams } from "react-router-dom";

const ManageOrderDetails = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  // console.log(_id);

  const [changes, increaseChanges] = useState(0);
  const [budget, setBudget] = useState(0);
  const {
    isLoading,
    isError,
    data: orderdetails,
    error,
  } = useQuery(["adminordersdetails", changes], async () => {
    let fdata = await axiosInstance.get(`order/find?_id=${_id}`);
    // console.log(fdata.data);
    Swal.close();
    return fdata.data;
  });

  useEffect(() => {
    setBudget(orderdetails?.clientBudget);
  }, [orderdetails]);

  const handleOrderStatus = (status) => {
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

  const handleUpdateBudget = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `Update the budget from ${orderdetails?.clientBudget} to ${budget}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        let tem = orderdetails;
        tem.clientBudget = budget;
        axiosInstance.put(`order/update?_id=${_id}`, tem).then((res) => {
          // console.log(res.data);
          if (res.status === 200) {
            Swal.fire(
              "Budget Updated!",
              `Your order budget has been updated to ${res?.data?.clientBudget}`,
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

  if (isError) return <ErrorPage msg={error}></ErrorPage>;
  if (isLoading) Swal.showLoading();

  return (
    <div className=" py-6 lg:px-10 md:px-10 sm:px-2  w-full text-sm">
      {/* PROJECT BASIC INFO */}
      <div className="pb-16">
        <div className="flex items-center border-b pb-2 mb-6 border-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-4 hover:cursor-pointer"
            onClick={() => navigate("/dashboard-admin/manage-orders")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>

          <p className="font-semibold uppercase text-xl ">Order Infomation</p>
        </div>

        <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-10 ">
          {/* BASIC AND STATUS UPDATE */}
          <div>
            <p>
              Created Date :{" "}
              <span>{orderdetails?.createdAt?.split("T")[0]}</span>, Time :{" "}
              <span>
                {orderdetails?.createdAt?.split("T")[1].split(".")[0]}
              </span>
            </p>
            <p>
              Updated Date :{" "}
              <span>{orderdetails?.updatedAt?.split("T")[0]}</span>, Time :{" "}
              <span>
                {orderdetails?.updatedAt?.split("T")[1].split(".")[0]}
              </span>
            </p>

            <p className="mt-2">
              <span className="mr-2">Current Order Status:</span>
              <p
                className={
                  orderdetails?.status === "pending"
                    ? "btn btn-xs"
                    : orderdetails?.status === "rejected"
                    ? "btn btn-xs bg-red-900 border-none text-white"
                    : orderdetails?.status === "accepted"
                    ? "btn btn-xs bg-blue-800 border-none text-white"
                    : orderdetails?.status === "processing"
                    ? "btn btn-xs bg-warning border-none text-white"
                    : orderdetails?.status === "completed"
                    ? "btn btn-xs bg-success border-none text-white"
                    : "btn btn-xs"
                }
              >
                {orderdetails?.status}
              </p>
            </p>
            <p className="my-6 uppercase font-semibold">
              Order Status Updating Button
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  handleOrderStatus("pending");
                }}
                className="btn btn-xs bg-gray-500 border-none text-white"
              >
                Pending
              </button>

              <button
                onClick={() => {
                  handleOrderStatus("accepted");
                }}
                className="btn btn-xs bg-blue-800 border-none text-white"
              >
                Accepted
              </button>

              <button
                onClick={() => {
                  handleOrderStatus("processing");
                }}
                className="btn btn-xs bg-warning border-none text-white"
              >
                Processing
              </button>

              <button
                onClick={() => {
                  handleOrderStatus("completed");
                }}
                className="btn btn-xs bg-success border-none text-white"
              >
                Completed
              </button>

              <button
                onClick={() => {
                  handleOrderStatus("rejected");
                }}
                className="btn btn-xs bg-red-900 border-none text-white"
              >
                Rejected
              </button>
            </div>
          </div>

          <div>
            <div className="form-control ">
              <label className="label">
                <span className="">Client Budget</span>
              </label>
              <div>
                <input
                  value={budget}
                  type="number"
                  onChange={(e) => {
                    setBudget(e.target.value);
                  }}
                  className="input input-bordered text-lg rounded max-w-xs "
                />
                <button onClick={handleUpdateBudget} className="btn ml-4">
                  Update
                </button>
              </div>
            </div>

            <p className="my-4">
              Order Category :
              <span className="btn btn-xs ml-2">
                {orderdetails?.serviceCategory === "3dmodel-design"
                  ? "Food truck, Container shop, booth Design"
                  : orderdetails?.serviceCategory}
              </span>
            </p>
            <p>Order Id : {orderdetails?._id}</p>
            <p>Order Placed By : {orderdetails?.userId}</p>
          </div>
        </div>
      </div>

      {/* ORDER INFORMATION */}
      <div className="pb-16">
        <p className="font-semibold uppercase text-xl border-b pb-2 mb-6 border-gray-100">
          Order Details
        </p>
        <div className="">
          {orderdetails?.serviceCategory === "landscape-design" && (
            <div>
              {/* PLAN */}
              <div className="mb-6">
                <p className="underline font-semibold">Site Plan</p>
                {orderdetails?.planing?.map((x, index) => {
                  return (
                    <div key={index} className="flex gap-2  items-center my-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <p>Site Plan File {index + 1}</p>
                      <a
                        href={x}
                        target="_blank"
                        download={true}
                        className="btn btn-xs"
                      >
                        download
                      </a>
                    </div>
                  );
                })}
              </div>
              {/* EXISTING IMAGE */}
              <div className="mb-6">
                <p className=" underline font-semibold">Existing Place Image</p>
                <div className="flex flex-wrap gap-6 ">
                  {orderdetails?.existingPlaceImages?.map((x, index) => {
                    return (
                      <div key={index} className="flex flex-col gap-2  my-3">
                        <img className="w-96" src={x} alt="" />
                        <div className="flex  gap-2  items-center my-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
                              clipRule="evenodd"
                            />
                          </svg>

                          <p>Existing Place Image {index + 1}</p>
                          <a
                            href={x}
                            target="_blank"
                            download={true}
                            className="btn btn-xs"
                          >
                            download
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Inspiration IMAGE */}
              <div className="mb-6">
                <p className=" underline font-semibold">Inspiration Image</p>
                <div className="flex flex-wrap gap-6">
                  {orderdetails?.inspirationImages?.map((x, index) => {
                    return (
                      <div key={index} className="flex flex-col gap-2  my-3">
                        <img className="w-96" src={x} alt="" />
                        <div className="flex  gap-2  items-center my-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
                              clipRule="evenodd"
                            />
                          </svg>

                          <p>Inspiration Image {index + 1}</p>
                          <a
                            href={x}
                            target="_blank"
                            download={true}
                            className="btn btn-xs"
                          >
                            download
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {orderdetails?.serviceCategory === "exterior-design" && (
            <div>
              {/* PLAN */}
              <div className="mb-6">
                <p className="underline font-semibold">House Plan</p>
                {orderdetails?.planing?.map((x, index) => {
                  return (
                    <div key={index} className="flex gap-2  items-center my-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <p>Site Plan File {index + 1}</p>
                      <a
                        href={x}
                        target="_blank"
                        download={true}
                        className="btn btn-xs"
                      >
                        download
                      </a>
                    </div>
                  );
                })}
              </div>
              {/* EXISTING IMAGE */}
              <div className="mb-6">
                <p className=" underline font-semibold">Existing House Image</p>
                <div className="flex flex-wrap gap-6">
                  {orderdetails?.existingPlaceImages?.map((x, index) => {
                    return (
                      <div key={index} className="flex flex-col gap-2  my-3">
                        <img className="w-96" src={x} alt="" />
                        <div className="flex  gap-2  items-center my-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
                              clipRule="evenodd"
                            />
                          </svg>

                          <p>Existing Place Image {index + 1}</p>
                          <a
                            href={x}
                            target="_blank"
                            download={true}
                            className="btn btn-xs"
                          >
                            download
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Inspiration IMAGE */}
              <div className="mb-6">
                <p className=" underline font-semibold">Inspiration Image</p>
                <div className="flex flex-wrap gap-6">
                  {orderdetails?.inspirationImages?.map((x, index) => {
                    return (
                      <div key={index} className="flex flex-col gap-2  my-3">
                        <img className="w-96" src={x} alt="" />
                        <div className="flex  gap-2  items-center my-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
                              clipRule="evenodd"
                            />
                          </svg>

                          <p>Inspiration Image {index + 1}</p>
                          <a
                            href={x}
                            target="_blank"
                            download={true}
                            className="btn btn-xs"
                          >
                            download
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {orderdetails?.serviceCategory === "interior-design" && (
            <div>
              {/* PLAN */}
              <div className="mb-6">
                <p className="underline font-semibold">2D Plan</p>
                {orderdetails?.planing?.map((x, index) => {
                  return (
                    <div key={index} className="flex gap-2  items-center my-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <p>Site Plan File {index + 1}</p>
                      <a
                        href={x}
                        target="_blank"
                        download={true}
                        className="btn btn-xs"
                      >
                        download
                      </a>
                    </div>
                  );
                })}
              </div>

              {/* Inspiration IMAGE */}
              <div className="mb-6">
                <p className=" underline font-semibold">Inspiration Image</p>
                <div className="flex flex-wrap gap-6">
                  {orderdetails?.inspirationImages?.map((x, index) => {
                    return (
                      <div key={index} className="flex flex-col gap-2  my-3">
                        <img className="w-96" src={x} alt="" />
                        <div className="flex  gap-2  items-center my-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
                              clipRule="evenodd"
                            />
                          </svg>

                          <p>Inspiration Image {index + 1}</p>
                          <a
                            href={x}
                            target="_blank"
                            download={true}
                            className="btn btn-xs"
                          >
                            download
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {orderdetails?.serviceCategory === "3dmodel-design" && (
            <div>
              {/* Inspiration IMAGE */}
              <div className="mb-6">
                <p className=" underline font-semibold">Inspiration Image</p>
                <div className="flex flex-wrap gap-6">
                  {orderdetails?.inspirationImages?.map((x, index) => {
                    return (
                      <div key={index} className="flex flex-col gap-2  my-3">
                        <img className="w-96" src={x} alt="" />
                        <div className="flex  gap-2  items-center my-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
                              clipRule="evenodd"
                            />
                          </svg>

                          <p>Inspiration Image {index + 1}</p>
                          <a
                            href={x}
                            target="_blank"
                            download={true}
                            className="btn btn-xs"
                          >
                            download
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {orderdetails?.serviceCategory === "others" && (
            <div>
              {/* PLAN */}
              <div className="mb-6">
                <p className="underline font-semibold">Plan</p>
                {orderdetails?.planing?.map((x, index) => {
                  return (
                    <div key={index} className="flex gap-2  items-center my-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <p>Site Plan File {index + 1}</p>
                      <a
                        href={x}
                        target="_blank"
                        download={true}
                        className="btn btn-xs"
                      >
                        download
                      </a>
                    </div>
                  );
                })}
              </div>
              {/* EXISTING IMAGE */}
              <div className="mb-6">
                <p className=" underline font-semibold">Existing Image</p>
                <div className="flex flex-wrap gap-6">
                  {orderdetails?.existingPlaceImages?.map((x, index) => {
                    return (
                      <div key={index} className="flex flex-col gap-2  my-3">
                        <img className="w-96" src={x} alt="" />
                        <div className="flex  gap-2  items-center my-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
                              clipRule="evenodd"
                            />
                          </svg>

                          <p>Existing Place Image {index + 1}</p>
                          <a
                            href={x}
                            target="_blank"
                            download={true}
                            className="btn btn-xs"
                          >
                            download
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Inspiration IMAGE */}
              <div className="mb-6">
                <p className=" underline font-semibold">Inspiration Image</p>
                <div className="flex flex-wrap gap-6">
                  {orderdetails?.inspirationImages?.map((x, index) => {
                    return (
                      <div key={index} className="flex flex-col gap-2  my-3">
                        <img className="w-96" src={x} alt="" />
                        <div className="flex  gap-2  items-center my-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
                              clipRule="evenodd"
                            />
                          </svg>

                          <p>Inspiration Image {index + 1}</p>
                          <a
                            href={x}
                            target="_blank"
                            download={true}
                            className="btn btn-xs"
                          >
                            download
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <div>
            {/* otherFiles */}
            {orderdetails?.otherFiles?.length !== 0 && (
              <div className="mb-6">
                <p className=" underline font-semibold">Others File</p>
                {orderdetails?.otherFiles?.map((x, index) => {
                  return (
                    <div key={index} className="flex gap-2  items-center my-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <p>Other Files {index + 1}</p>
                      <a
                        href={x}
                        target="_blank"
                        download={true}
                        className="btn btn-xs"
                      >
                        download
                      </a>
                    </div>
                  );
                })}
              </div>
            )}
            {/* discription */}
            {orderdetails?.projectDiscription !== "" && (
              <div className="mb-6">
                <p className="underline font-semibold mb-3">
                  Order Discription
                </p>
                <p className="rounded-xl p-3 border border-gray-200">
                  {orderdetails?.projectDiscription}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CLIENT INFORMATION */}
      <div className="pb-16">
        <p className="font-semibold uppercase text-xl border-b pb-2 mb-6 border-gray-100">
          Client INFORMATION
        </p>

        <p>Name: {orderdetails?.clientName}</p>
        <p>Whapt'sApp: {orderdetails?.clientWhatsappNum}</p>
        <p>Email: {orderdetails?.clientEmail}</p>
        <p className="mt-3">Other Communication Link: </p>
        <p>{orderdetails?.clientOtherComLink}</p>
        {/* clientMessage */}
        {orderdetails?.clientMessage !== "" && (
          <div className="my-3">
            <p className="">Client Message</p>
            <p className="">{orderdetails?.clientMessage}</p>
          </div>
        )}
      </div>
      {/* REVIEW INFORMATION */}
      <div className="pb-16"></div>
    </div>
  );
};

export default ManageOrderDetails;
