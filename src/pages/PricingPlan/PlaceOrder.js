import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const PlaceOrder = () => {
  const { type } = useParams();
  // REACT FORM HOOKS
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="lg:px-20 sm:px-8 py-10 w-full max-w-7xl mx-auto flex flex-col  min-h-screen">
      <form>
        {/*---------- VARIABLE FOR ORDER ---------*/}
        <p className="uppercase text-sm tracking-widest btn btn-xs rounded-b-none">
          Order information
        </p>
        <div className="border border-gray-300 p-8 rounded-b-xl mb-16 ">
          {/* ORDER FOR */}
          <div className="mt-6">
            <p>
              Order For:
              <span className="uppercase font-semibold btn btn-xs bg-green-500 border-none text-white ml-1">
                {type}
              </span>
            </p>
          </div>
          {/* VARIOUS REQUIREMENT */}
          {/* FOR LANDSCAPE */}
          {type === "landscape-design" && (
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 mt-6">
              {/* SITE PLAN */}
              <div className="form-control w-full ">
                <label className="label">
                  <span className="">Site Planing</span>
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
              <div className="form-control w-full ">
                <label className="label">
                  <span className="">houseAddress</span>
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
              </div>
              {/* EXSISTING PLACE IMAGE */}
              <div className="form-control w-full ">
                <label className="label">
                  <span className="">existingPlaceImages</span>
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
                  <span className="">inspirationImages</span>
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
          {type === "exterior-design" && (
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 mt-6">
              {/* SITE PLAN */}
              <div className="form-control w-full ">
                <label className="label">
                  <span className="">Site Planing</span>
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
                  <span className="">existingPlaceImages</span>
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
                  <span className="">inspirationImages</span>
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
          {type === "interior-design" && (
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 mt-6">
              {/*2D SITE PLAN */}
              <div className="form-control w-full ">
                <label className="label">
                  <span className="">2D Planning</span>
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
                  <span className="">inspirationImages</span>
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
          {type === "3dmodel-design" && (
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 mt-6">
              {/* INSPIRATION IMAGE */}
              <div className="form-control w-full ">
                <label className="label">
                  <span className="">inspirationImages</span>
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
            {/* OTHER FILES*/}
            <div className="form-control w-full ">
              <label className="label">
                <span className="">otherFiles</span>
              </label>
              <input
                multiple
                type="file"
                name="otherFiles"
                className="input input-bordered text-xs rounded w-full "
                {...register("otherFiles", { required: false })}
              />
            </div>
            {/* BUDGET */}
            <div className="form-control w-full ">
              <label className="label">
                <span className="">clientBudget</span>
              </label>
              <input
                type="text"
                name="clientBudget"
                className="input input-bordered text-xs rounded w-full "
                {...register("clientBudget", {
                  required: false,
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
          </div>
          {/* PROJECT DETAILS */}
          <div className="form-control w-full mt-6">
            <label className="label">
              <span className="">projectDiscription</span>
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
        {/* OTHER FILES & COMMENTS */}
        <div></div>
        {/* USER INFORMATION */}
        <p className="uppercase text-sm tracking-widest btn btn-xs rounded-b-none">
          Delivery information
        </p>
        <div className="border border-gray-300 p-8 rounded-b-xl ">
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 mt-6">
            {/* CLIENT NAME */}
            <div className="form-control w-full ">
              <label className="label">
                <span className="">Recipient Name</span>
              </label>
              <input
                type="text"
                name="clientName"
                className="input input-bordered text-xs rounded w-full "
                {...register("clientName", {
                  required: false,
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
                <span className="">WhatsApp Number</span>
              </label>
              <input
                type="text"
                name="clientWhatsappNum"
                className="input input-bordered text-xs rounded w-full "
                {...register("clientWhatsappNum", {
                  required: false,
                  message: "This field is required",
                })}
              />
              {errors.clientWhatsappNums && (
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
                <span className="">Email</span>
              </label>
              <input
                type="text"
                name="clientEmail"
                className="input input-bordered text-xs rounded w-full "
                {...register("clientEmail", {
                  required: false,
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
      </form>
    </div>
  );
};

export default PlaceOrder;
