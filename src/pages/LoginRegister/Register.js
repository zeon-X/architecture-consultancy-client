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

const Register = () => {
  const API = "319969b2b7f96e580b0f112231e21ca5";
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [userData, setUserData] = useState({});
  const [fcnt, setFcnt] = useState(0);
  const navigate = useNavigate();

  const location = useLocation();
  let navNext =
    location?.search?.split("=")[1] + "=" + location?.search?.split("=")[2] ||
    "/";
  if (navNext.includes("undefined")) navNext = "/";

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
      setMsg("Password Did'nt matched");
      setFcnt(0);
      return;
    }
    setMsg("");
    setLoading(true);

    //fire base auth
    await createUserWithEmailAndPassword(data.email, data.password);

    // IMAGE UPLOADS
    let image = "";
    let imgData = new FormData();
    imgData.append("image", data.profile_pic[0]);
    await axios
      .post(`https://api.imgbb.com/1/upload?key=${API}`, imgData)
      .then((res) => {
        if (res.data.status === 200) {
          image = res.data.data.display_url;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // ASSEMBLING ALL DATA
    if (image !== "") data.profile_pic = image;
    else data.profile_pic = "";
    let { confirmpassword, password, ...restData } = data;

    setUserData(restData);
  };

  useEffect(() => {
    // console.log("hey.");
    if (user && Object.keys(userData).length != 0 && fcnt === 0) {
      setFcnt(1);
      let dataa = { ...userData, userId: user?.user?.uid };
      // console.log(dataa);
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
            `You have successfully added the Item.`,
            "success"
          ).then(() => {
            resetField("name");
            resetField("password");
            resetField("confirmpassword");
            resetField("profile_pic");
            resetField("email");
            resetField("phone");
            navigate(navNext);
          });
        } else {
          Swal.fire("Error!", `Something went wrong`, "error");
        }
      });
    }
    // setLoading(false);
  }, [userData, user]);

  if (loading || loading1) {
    return <Loading msg="registering.."></Loading>;
  }

  return (
    <div className="h-fit my-20 flex justify-center items-start lg:px-20 sm:px-4">
      {/* intro  */}
      <div className="hidden md:block lg:block py-10 px-16 w-6/12">
        <img
          className="w-44 h-44"
          src="https://cdn-icons-png.flaticon.com/512/3352/3352770.png"
          alt=""
        />
        <p className="font-bold text-3xl mb-4 mt-6 underline">
          Register Account
        </p>
        <p className="text-sm">
          By creating an account you will be able to shop faster, be up to date
          on an order's status, and keep track of the orders you have previously
          made
        </p>
      </div>
      {/* regidter card */}
      <div className="card justify-center items-center rounded-none w-96 bg-base-100 shadow-xl p-5 border border-dashed border-gray-200">
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
              className="input input-bordered w-full max-w-xs rounded-none"
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
              className="input input-bordered w-full max-w-xs rounded-none"
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
              className="input input-bordered w-full max-w-xs rounded-none"
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
              className="input input-bordered w-full max-w-xs rounded-none"
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
              className="input input-bordered w-full max-w-xs rounded-none"
            />

            <label className="label">
              {errors.Password && (
                <span className="label-text-alt text-sm text-red-500">
                  This field is required
                </span>
              )}
            </label>
          </div>
          <div className="form-control w-full max-w-xs">
            <input
              {...register("profile_pic", {
                required: true,
              })}
              type="file"
              className="file-input file-input-bordered w-full max-w-xs rounded-none"
            />

            <label className="label">
              {errors.profile_pic && (
                <span className="label-text-alt text-sm text-red-500">
                  This field is required
                </span>
              )}
            </label>
          </div>

          {/* Navigation LINKS */}
          <div className="flex justify-between text-xs mb-4 w-full max-w-xs">
            <p>Alradey have an Account?</p>
            <a
              onClick={() => navigate("/login")}
              className="underline text-warning hover:cursor-pointer ml-4"
            >
              Login
            </a>
          </div>
          {msg !== "" && (
            <label className="label">
              <span className="label-text-alt text-sm text-red-500">{msg}</span>
            </label>
          )}
          <input
            type="submit"
            className="btn btn-warning w-full max-w-xs rounded-none"
            name=""
            value="Register"
          />
        </form>

        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
