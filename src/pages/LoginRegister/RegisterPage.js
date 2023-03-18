import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../../shared/SocialLogin/SocialLogin";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { auth } from "../../firebase.init";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import Loading from "../../shared/Loading";

const RegisterPage = () => {
  const API = "04f0795ca819457ba8b6c8ec73023069";
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [fcnt, setFcnt] = useState(0);
  const navigate = useNavigate();

  const {
    register,
    resetField,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [createUserWithEmailAndPassword, user, loading1, error] =
    useCreateUserWithEmailAndPassword(auth);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmpassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Password Did'nt matched`,
      });
      setFcnt(0);
      return;
    }

    //fire base auth
    await createUserWithEmailAndPassword(data.email, data.password);

    // IMAGE UPLOADS
    // let image = "";
    // let imgData = new FormData();
    // imgData.append("image", data.profilePic[0]);
    // if (data.profilePic[0]) {
    //   await axios
    //     .post(`https://api.imgbb.com/1/upload?key=${API}`, imgData)
    //     .then((res) => {
    //       if (res.data.status === 200) {
    //         image = res.data.data.display_url;
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }

    // // ASSEMBLING ALL DATA
    // if (image !== "") data.profilePic = image;
    // else data.profilePic = "";

    data.profilePic = user?.user?.photoURL ? user?.user?.photoURL : "";

    let { confirmpassword, password, ...restData } = data;
    setUserData(restData);
  };
  //   console.log(userData);

  useEffect(() => {
    if (user && Object.keys(userData).length != 0 && fcnt === 0) {
      setLoading(true);
      setFcnt(1);
      let dataa = { ...userData, userId: user?.user?.uid };
      //   console.log(dataa);
      axiosInstance.post("auth/reglog", dataa).then((res) => {
        setLoading(false);
        // console.log(res.data);
        if (res.status === 200) {
          localStorage.setItem(
            "authorization",
            `Bearer ${res?.data?.authorization}`
          );
          localStorage.setItem("user", JSON.stringify(res?.data?.user));
          Swal.fire(
            "Saved!",
            `You have successfully Registered.`,
            "success"
          ).then(() => {
            resetField("name");
            resetField("password");
            resetField("confirmpassword");
            resetField("email");
            resetField("phone");
            navigate("/");
          });
        } else {
          Swal.fire("Error!", `Something went wrong`, "error");
        }
      });
    }
    // setLoading(false);
  }, [userData, user]);

  // LODING AND SPINNERS
  if (loading || loading1) {
    return <Loading></Loading>;
  }
  if (error) {
    Swal.close();
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error?.message}`,
    });
  }
  return (
    <div>
      <div className="py-24">
        <p className="font-bold text-2xl text-center w-full">Register</p>
        <p className="text-xs text-center">RETURNING CUSTOMER</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="my-10 w-full flex flex-col justify-center items-center"
        >
          {/* Name */}
          <div className="form-control w-full max-w-xs">
            <input
              {...register("name", {
                required: true,
              })}
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full max-w-xs rounded"
            />

            <label className="label">
              {errors.name && (
                <span className="label-text-alt text-sm text-red-500">
                  This field is required
                </span>
              )}
            </label>
          </div>
          {/* Phone */}
          <div className="form-control w-full max-w-xs">
            <input
              {...register("phone", {
                required: true,
              })}
              type="text"
              placeholder="Phone Number"
              className="input input-bordered w-full max-w-xs rounded"
            />

            <label className="label">
              {errors.phone && (
                <span className="label-text-alt text-sm text-red-500">
                  This field is required
                </span>
              )}
            </label>
          </div>
          {/* Email */}
          <div className="form-control w-full max-w-xs">
            <input
              {...register("email", {
                required: true,
              })}
              type="email"
              placeholder="Email"
              className="input input-bordered w-full max-w-xs rounded"
            />

            <label className="label">
              {errors.email && (
                <span className="label-text-alt text-sm text-red-500">
                  This field is required
                </span>
              )}
            </label>
          </div>
          {/* Password */}
          <div className="form-control w-full max-w-xs">
            <input
              {...register("password", {
                required: true,
              })}
              type="password"
              placeholder="Password"
              className="input input-bordered w-full max-w-xs rounded"
            />

            <label className="label">
              {errors.password && (
                <span className="label-text-alt text-sm text-red-500">
                  This field is required
                </span>
              )}
            </label>
          </div>
          {/* Repeat Password */}
          <div className="form-control w-full max-w-xs">
            <input
              {...register("confirmpassword", {
                required: true,
              })}
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered w-full max-w-xs rounded"
            />

            <label className="label">
              {errors.Password && (
                <span className="label-text-alt text-sm text-red-500">
                  This field is required
                </span>
              )}
            </label>
          </div>

          {/* Navigation LINKS */}
          <div className="flex justify-between text-xs mb-4 w-full max-w-xs">
            <p>Alradey have an Account?</p>
            <button
              className="text-blue-900 underline"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>

          <input
            type="submit"
            className="btn  w-full max-w-xs rounded"
            name=""
            value="Register"
          />
        </form>

        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default RegisterPage;
