import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../shared/Loading";

import axiosInstance from "../../utilities/axiosInstance/axiosInstance";

const EditMyProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [education, setEducation] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    if (userInfo?.education) setEducation(userInfo.education);
    if (userInfo?.socialLinks) setSocialLinks(userInfo.socialLinks);
  }, [userInfo]);

  const eduRef = useRef(null);
  const handleEduChanges = () => {
    setEducation([...education, eduRef.current.value]);
    eduRef.current.value = "";
  };

  const mediaRef = useRef(null);
  const valueRef = useRef(null);
  const handleSocialLinksChanges = () => {
    setSocialLinks([
      ...socialLinks,
      { key: mediaRef?.current?.value, value: valueRef.current.value },
    ]);

    mediaRef.current.value = "";
    valueRef.current.value = "";
  };

  // USE FORM --- juice
  const {
    register,
    resetField,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: userInfo?.address,
    },
  });

  const onSubmit = async (data) => {
    data.education = education;
    data.socialLinks = socialLinks;

    if (data.address.replace(/\s\s+/g, "") === "")
      data.address = userInfo?.address || "";
    else {
      data.address = data.address.replace(/\s\s+/g, "");
    }
    if (data.phone.replace(/\s\s+/g, "") === "")
      data.phone = userInfo?.phone || "";
    else {
      data.phone = data.phone.replace(/\s\s+/g, "");
    }

    //update data here
    Swal.fire({
      title: "Are you sure?",
      text: `You want to update your information?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axiosInstance
          .put(`user/update?_id=${userInfo?._id}`, data)
          .then((res) => {
            setLoading(false);
            // console.log(res.data);
            if (res.status === 200) {
              localStorage.setItem("user", JSON.stringify(res?.data));
              Swal.fire(
                "Congratulations!",
                `You've updated your profile!`,
                "success"
              ).then(() => {
                navigate("/dashboard/my-account");
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: res?.response?.data?.message || res?.response?.data,
              });
            }
          });
      }
    });

    // setLoading(false);

    // console.log(data);
  };
  if (loading) {
    Swal.showLoading();
  }

  //   console.log(watch("address"));

  return (
    <div className="py-6 lg:px-10 md:px-10 sm:px-2  w-full">
      <p className="text-sm font-bold mb-6">Update Account</p>
      <div className="grid w-full gap-6 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1">
        {/* edu */}
        <div className="text-xs  border border-gray-300 p-1 border-dashed ">
          <p className="mb-4 underline">Add Education</p>
          <div className="flex sm:justify-center md:justify-center lg:justify-between lg:flex-row md:flex-col sm:flex-col gap-5 w-full">
            <input
              ref={eduRef}
              type="text"
              placeholder="Type here"
              className="input input-bordered rounded-none text-xs lg:w-11/12 md:w-full sm:w-full"
            />
            <p
              onClick={handleEduChanges}
              className="btn btn-success lg:btn-circle md:btn-wide sm:btn-full"
            >
              add
            </p>
          </div>
          <p className=" my-4">Education Changes</p>
          <div className="">
            <p className="font-bold border border-gray-200 p-1">Education</p>
            {education?.map((x, index) => {
              return (
                <p key={index} className="border border-gray-200 p-1">
                  {x}
                </p>
              );
            })}
          </div>
        </div>
        {/* social link */}
        <div className="text-xs border border-gray-300 p-1 border-dashed my-10">
          <p className="mb-4 underline">Add SocialLinks</p>
          <div className="flex lg:justify-between md:justify-center sm:justify-center lg:flex-row md:flex-col sm:flex-col gap-5 w-full">
            <input
              ref={mediaRef}
              type="text"
              placeholder="Social Name"
              className="input input-bordered rounded-none text-xs lg:w-5/12 md:w-full sm:w-full"
            />
            <input
              ref={valueRef}
              type="text"
              placeholder="Social Link"
              className="input input-bordered rounded-none text-xs  w-5/12 md:w-full sm:w-full"
            />
            <p
              onClick={handleSocialLinksChanges}
              className="btn btn-success lg:btn-circle md:btn-wide sm:btn-full"
            >
              add
            </p>
          </div>
          <p className=" my-4">SocialLinks Changes</p>
          <div className="">
            <div className="grid grid-cols-2 font-bold ">
              <p className="border border-gray-200 p-1">Social Media</p>
              <p className="border border-gray-200 p-1">Link</p>
            </div>
            {socialLinks?.map((x, index) => {
              return (
                <div key={index} className="grid grid-cols-2">
                  <p className=" p-1 border border-gray-200">{x?.key}</p>
                  <p className=" p-1 border border-gray-200">{x?.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* address form */}
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-control text-xs w-full mt-6">
          <p className="font-bold">Phone</p>
          <p className="my-2">Your Current Address : {userInfo?.phone}</p>
          <p className="font-bold underline mb-2">Update your Phone</p>
          <input
            {...register("phone", {
              required: false,
            })}
            value={watch("phone")}
            className="input input-bordered rounded-none text-xs "
            placeholder="Type Here"
          ></input>
        </div>
        {/* address */}
        <div className="form-control text-xs w-full mt-6">
          <p className="font-bold">Address</p>
          <p className="my-2">Your Current Address : {userInfo?.address}</p>
          <p className="font-bold underline mb-2">Update your Address</p>
          <textarea
            {...register("address", {
              required: false,
            })}
            value={watch("address")}
            className="textarea textarea-bordered h-24 text-xs rounded-none"
            placeholder="Type Here"
          ></textarea>
        </div>

        <input
          type="submit"
          className="btn btn-warning w-full max-w-xs rounded-none mt-10"
          name=""
          value="Update Profile"
        />
      </form>
    </div>
  );
};

export default EditMyProfile;
