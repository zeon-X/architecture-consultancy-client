import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const PlaceOrder = () => {
  const { type } = useParams();
  const API = "04f0795ca819457ba8b6c8ec73023069";
  const [loading, setLoading] = useState(false);

  // -----------USER DATA FETCHING
  const [userData, setUserData] = useState({});
  let userInfo = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    let tem = {
      clientName: userInfo?.name,
      clientEmail: userInfo?.email,
    };
    setUserData(tem);
  }, []);
  // console.log(userInfo);

  //---------------- REACT FORM HOOKS
  const {
    register,
    resetField,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return userData;
    }, [userData]),
  });

  useEffect(() => {
    reset(userData);
  }, [userData]);

  //---------------SUBMIL FUNCTION
  const onSubmit = async (data) => {
    Swal.showLoading();
    // setLoading(true);

    data.serviceCategory = type;
    data.userId = userInfo?._id;

    // planing UPLOADS -------- BEFORE
    let len = data?.planing?.length;
    let planingArr = [];
    for (let i = 0; i < len; ++i) {
      let formData2 = new FormData();
      formData2.append("file", data.planing[i]);
      await axiosInstance
        .post("/file/upload", formData2)
        .then((res) => {
          //console.log(res);
          if (res.status === 200) {
            planingArr.push(res?.data?.url);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // existingPlaceImages UPLOADS -------- BEFORE
    len = data?.existingPlaceImages?.length;
    let existingPlaceImagesArr = [];
    for (let i = 0; i < len; ++i) {
      let formData2 = new FormData();
      formData2.append("file", data.existingPlaceImages[i]);
      await axiosInstance
        .post("/file/upload", formData2)
        .then((res) => {
          //console.log(res);
          if (res.status === 200) {
            existingPlaceImagesArr.push(res?.data?.url);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // console.log(existingPlaceImagesArr);

    // inspirationImages UPLOADS -------- BEFORE
    len = data?.inspirationImages?.length;
    let inspirationImagesArr = [];
    for (let i = 0; i < len; ++i) {
      let formData2 = new FormData();
      formData2.append("file", data.inspirationImages[i]);
      await axiosInstance
        .post("/file/upload", formData2)
        .then((res) => {
          //console.log(res);
          if (res.status === 200) {
            inspirationImagesArr.push(res?.data?.url);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // otherFiles UPLOADS -------- BEFORE
    len = data?.otherFiles?.length;
    let otherFilesArr = [];
    for (let i = 0; i < len; ++i) {
      let formData2 = new FormData();
      formData2.append("file", data.otherFiles[i]);
      await axiosInstance
        .post("/file/upload", formData2)
        .then((res) => {
          //console.log(res);
          if (res.status === 200) {
            otherFilesArr.push(res?.data?.url);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // ASSEMBLING ALL DATA
    if (planingArr.length !== 0) data.planing = planingArr;
    else data.planing = [];

    if (existingPlaceImagesArr.length !== 0)
      data.existingPlaceImages = existingPlaceImagesArr;
    else data.existingPlaceImages = [];

    if (inspirationImagesArr.length !== 0)
      data.inspirationImages = inspirationImagesArr;
    else data.inspirationImages = [];

    if (otherFilesArr.length !== 0) data.otherFiles = otherFilesArr;
    else data.otherFiles = [];

    console.log(data);

    //SENDING DATA TO MONGO-DB DATABASE
    await axiosInstance.post("order/create", data).then((res) => {
      if (res.status === 201) {
        Swal.fire(
          "Saved!",
          `You have successfully completed Ordered.`,
          "success"
        ).then(() => {
          resetField("clientBudget");
          resetField("aboutLeft");
          resetField("clientMessage");
          resetField("clientOtherComLink");
          resetField("clientWhatsappNum");
          resetField("clientAddress");
          resetField("planing");
          resetField("houseAddress");
          resetField("existingPlaceImages");
          resetField("inspirationImages");
          resetField("otherFiles");
          resetField("projectDiscription");
        });
      } else {
        Swal.fire("Error!", `Something went wrong`, "error");
      }
      console.log(res.data);
    });
  };

  return (
    <div className="lg:px-20 sm:px-8 py-10 w-full max-w-7xl mx-auto flex flex-col  min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/*---------- VARIABLE FOR ORDER ---------*/}
        <p className="uppercase text-sm tracking-widest btn btn-xs rounded-b-none">
          Order information
        </p>
        <div className="border border-gray-300 p-8 rounded-b-xl rounded-tr-xl mb-16 text-sm">
          {/* ORDER FOR */}
          <div className="mt-6">
            <p>
              Order Placing For:
              <span className="uppercase font-semibold btn btn-xs bg-green-500 border-none text-white ml-1">
                {type === "3dmodel-design"
                  ? "Food truck, Container shop, Stall, booth Design"
                  : type}
              </span>
            </p>
          </div>
          {/* VARIOUS REQUIREMENT */}
          {/* !!!!!! LANDSCAPE !!!!!!!!*/}
          {type === "landscape-design" && (
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 mt-6">
              {/* SITE PLAN */}
              <div className="form-control w-full ">
                <label className="label">
                  <span className="">Site Plan</span>
                </label>
                <input
                  multiple
                  type="file"
                  name="planing"
                  className="input input-bordered text-xs rounded w-full "
                  {...register("planing", { required: false })}
                />
              </div>
              {/* HOUSE ADDRESS */}
              {/* <div className="form-control w-full ">
                <label className="label">
                  <span className="">House Address</span>
                </label>
                <input
                  type="text"
                  name="houseAddress"
                  className="input input-bordered text-xs rounded w-full "
                  {...register("houseAddress", {
                    required: false,
                    message: "This field is required",
                  })}
                />
                {errors.houseAddress && (
                  <label className="label">
                    <span className="-alt text-sm text-red-500">
                      This field is required
                    </span>
                  </label>
                )}
              </div> */}
              {/* EXSISTING PLACE IMAGE */}
              <div className="form-control w-full ">
                <label className="label">
                  <span className="">Existing Place Images</span>
                </label>
                <input
                  multiple
                  type="file"
                  name="existingPlaceImages"
                  className="input input-bordered text-xs rounded w-full "
                  {...register("existingPlaceImages", { required: false })}
                />
              </div>
              {/* INSPIRATION IMAGE */}
              <div className="form-control w-full ">
                <label className="label">
                  <span className="">Inspiration Images</span>
                </label>
                <input
                  multiple
                  type="file"
                  name="inspirationImages"
                  className="input input-bordered text-xs rounded w-full "
                  {...register("inspirationImages", { required: false })}
                />
              </div>
            </div>
          )}
          {/* !!!!!! EXTERIOR !!!!!!!!*/}
          {type === "exterior-design" && (
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 mt-6">
              {/* House PLAN */}
              <div className="form-control w-full ">
                <label className="label">
                  <span className="">House Plan</span>
                </label>
                <input
                  multiple
                  type="file"
                  name="planing"
                  className="input input-bordered text-xs rounded w-full "
                  {...register("planing", { required: false })}
                />
              </div>

              {/* EXSISTING PLACE IMAGE */}
              <div className="form-control w-full ">
                <label className="label">
                  <span className="">Existing House Images</span>
                </label>
                <input
                  multiple
                  type="file"
                  name="existingPlaceImages"
                  className="input input-bordered text-xs rounded w-full "
                  {...register("existingPlaceImages", { required: false })}
                />
              </div>
              {/* INSPIRATION IMAGE */}
              <div className="form-control w-full ">
                <label className="label">
                  <span className="">Inspiration Images</span>
                </label>
                <input
                  multiple
                  type="file"
                  name="inspirationImages"
                  className="input input-bordered text-xs rounded w-full "
                  {...register("inspirationImages", { required: false })}
                />
              </div>
            </div>
          )}
          {/* !!!!!! INTERIOR !!!!!!!!*/}
          {type === "interior-design" && (
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 mt-6">
              {/*2D SITE PLAN */}
              <div className="form-control w-full ">
                <label className="label">
                  <span className="">2D Plan</span>
                </label>
                <input
                  multiple
                  type="file"
                  name="planing"
                  className="input input-bordered text-xs rounded w-full "
                  {...register("planing", { required: false })}
                />
              </div>

              {/* INSPIRATION IMAGE */}
              <div className="form-control w-full ">
                <label className="label">
                  <span className="">Inspiration Images</span>
                </label>
                <input
                  multiple
                  type="file"
                  name="inspirationImages"
                  className="input input-bordered text-xs rounded w-full "
                  {...register("inspirationImages", { required: false })}
                />
              </div>
            </div>
          )}
          {/* !!!!!! Food truck, Container shop, Stall, booth Design !!!!!!!!*/}
          {type === "3dmodel-design" && (
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 mt-6">
              {/* INSPIRATION IMAGE */}
              <div className="form-control w-full ">
                <label className="label">
                  <span className="">Inspiration Images</span>
                </label>
                <input
                  multiple
                  type="file"
                  name="inspirationImages"
                  className="input input-bordered text-xs rounded w-full "
                  {...register("inspirationImages", { required: false })}
                />
              </div>
            </div>
          )}
          {/* !!!!!! OTHERS !!!!!!!!*/}
          {type === "others" && (
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 mt-6">
              {/* INSPIRATION IMAGE */}
              <div className="form-control w-full ">
                <label className="label">
                  <span className="">Inspiration Images</span>
                </label>
                <input
                  multiple
                  type="file"
                  name="inspirationImages"
                  className="input input-bordered text-xs rounded w-full "
                  {...register("inspirationImages", { required: false })}
                />
              </div>
            </div>
          )}

          {/*-------- OTHER MANDATORY REQUIREMENTS------ */}

          <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 mt-6">
            {/* BUDGET */}
            <div className="form-control w-full ">
              <label className="label">
                <span className="">
                  Budget for the Project (USD)
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                name="clientBudget"
                className="input input-bordered text-xs rounded w-full "
                {...register("clientBudget", {
                  required: true,
                  message: "This field is required",
                })}
              />
              {errors.clientBudget && (
                <label className="label">
                  <span className="-alt text-sm text-red-500">
                    This field is required
                  </span>
                </label>
              )}
            </div>
            {/* OTHER FILES*/}
            <div className="form-control w-full ">
              <label className="label">
                <span className="">Additional Files</span>
              </label>
              <input
                multiple
                type="file"
                name="otherFiles"
                className="input input-bordered text-xs rounded w-full "
                {...register("otherFiles", { required: false })}
              />
            </div>
          </div>
          {/* PROJECT DETAILS */}
          <div className="form-control w-full mt-6">
            <label className="label">
              <span className="">Project Discription</span>
            </label>
            <textarea
              type="text"
              name="projectDiscription"
              className="textarea textarea-bordered rounded text-xs h-24"
              {...register("projectDiscription", {
                required: false,
              })}
            />
            {errors.projectDiscription && (
              <label className="label">
                <span className="-alt text-sm text-red-500">
                  This field is required
                </span>
              </label>
            )}
          </div>
        </div>

        {/*----------- MANDATORY FOR ALL TYPE OF ORDER------------- */}

        {/* USER INFORMATION */}
        <p className="uppercase text-sm tracking-widest btn btn-xs rounded-b-none">
          Delivery information
        </p>
        <div className="border border-gray-300 p-8 rounded-b-xl rounded-tr-xl text-sm">
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 mt-6">
            {/* CLIENT NAME */}
            <div className="form-control w-full ">
              <label className="label">
                <span className="">
                  Recipient Name <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                name="clientName"
                className="input input-bordered text-xs rounded w-full "
                {...register("clientName", {
                  required: true,
                  message: "This field is required",
                })}
              />
              {errors.clientName && (
                <label className="label">
                  <span className="-alt text-sm text-red-500">
                    This field is required
                  </span>
                </label>
              )}
            </div>
            {/*  clientWhatsappNum */}
            <div className="form-control w-full ">
              <label className="label">
                <span className="">
                  What'sApp Number (with Country code)
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                name="clientWhatsappNum"
                className="input input-bordered text-xs rounded w-full "
                {...register("clientWhatsappNum", {
                  required: true,
                  message: "This field is required",
                })}
              />
              {errors.clientWhatsappNum && (
                <label className="label">
                  <span className="-alt text-sm text-red-500">
                    This field is required
                  </span>
                </label>
              )}
            </div>
            {/* CLIENT EMAIL */}
            <div className="form-control w-full ">
              <label className="label">
                <span className="">
                  Email<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                name="clientEmail"
                className="input input-bordered text-xs rounded w-full "
                {...register("clientEmail", {
                  required: true,
                  message: "This field is required",
                })}
              />
              {errors.clientEmail && (
                <label className="label">
                  <span className="-alt text-sm text-red-500">
                    This field is required
                  </span>
                </label>
              )}
            </div>
            {/*  clientOtherComLink */}
            <div className="form-control w-full ">
              <label className="label">
                <span className="">Other Communication Link</span>
              </label>
              <input
                type="text"
                name="clientOtherComLink"
                className="input input-bordered text-xs rounded w-full "
                {...register("clientOtherComLink", {
                  required: false,
                  message: "This field is required",
                })}
              />
              {errors.clientOtherComLink && (
                <label className="label">
                  <span className="-alt text-sm text-red-500">
                    This field is required
                  </span>
                </label>
              )}
            </div>
          </div>
          {/* CLIENT MESSAGE */}
          <div className="form-control w-full mt-6">
            <label className="label">
              <span className="">Any Message</span>
            </label>
            <textarea
              type="text"
              name="clientMessage"
              className="textarea textarea-bordered rounded text-xs h-24"
              {...register("clientMessage", {
                required: false,
              })}
            />
            {errors.clientMessage && (
              <label className="label">
                <span className="-alt text-sm text-red-500">
                  This field is required
                </span>
              </label>
            )}
          </div>
        </div>
        {/* ------------------ SUBMIT BTN ------------- */}
        <div className="w-full flex justify-center items-center">
          <input
            type="submit"
            value="Place Order"
            className="btn btn-wide bg-green-500 text-white border-none max-w-xs  mt-10"
          ></input>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
