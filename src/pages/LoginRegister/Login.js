import React, { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { auth } from "../../firebase.init";
import Loading from "../../shared/Loading";
import SocialLogin from "../../shared/SocialLogin/SocialLogin";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import LogoutFunc from "../../utilities/Functions/LogoutFunc";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fcnt, setFcnt] = useState(0);
  const [signInWithEmailAndPassword, user, loading1, error] =
    useSignInWithEmailAndPassword(auth);
  const handleForgetPassword = () => {};

  const location = useLocation();
  const navNext =
    location?.state?.from?.pathname + location?.state?.from?.search || "/";
  console.log(navNext);

  const {
    register,
    resetField,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    //fire base auth
    await signInWithEmailAndPassword(data.email, data.password);
  };

  useEffect(() => {
    if (error) setLoading(false);
    if (user && fcnt === 0) {
      setFcnt(1);
      axiosInstance
        .post("auth/reglog", {
          profile_pic: user?.user?.photoURL,
          name: user?.user?.displayName,
          email: user?.user?.email,
          userId: user?.user?.uid,
        })
        .then((res) => {
          console.log(res.data);
          setLoading(false);
          if (res?.status === 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: `Welcome ${user?.user?.displayName}!`,
              showConfirmButton: true,
              timer: 3000,
            });

            console.log(res.data);
            localStorage.setItem(
              "authorization",
              `Bearer ${res?.data?.authorization}`
            );
            localStorage.setItem("user", JSON.stringify(res?.data?.user));
            navigate(navNext || "/");
          } else {
            Swal.fire("Error!", `Something went wrong`, "error");
            LogoutFunc(auth);
          }
        });
      // setLoading(false);
    }
  }, [user]);
  if (loading || loading1) {
    return <Loading msg="rendering.."></Loading>;
  }

  return (
    <div className="h-fit my-20 flex justify-center  items-start lg:px-20 sm:px-4">
      {/* intro  */}
      <div className="hidden md:block lg:block py-10 px-16 w-6/12">
        <img
          className="w-44 h-44"
          src="https://cdn-icons-png.flaticon.com/512/4443/4443991.png"
          alt=""
        />
        <p className="font-bold text-3xl mb-4 mt-6 underline">Login Account</p>
        <p className="text-sm">
          By Login an account you will be able to shop faster, be up to date on
          an order's status, and keep track of the orders you have previously
          made
        </p>
      </div>
      {/* Login card */}
      <div className="card justify-center items-center rounded-none w-96 bg-base-100 shadow-xl p-5 border border-dashed border-gray-200">
        <p className="font-bold text-2xl text-center w-full">Login</p>
        <p className="text-xs text-center">RETURNING CUSTOMER</p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="my-10 w-full flex flex-col justify-center items-center"
        >
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
              {errors?.email && (
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
          {/* Navigation LINKS */}
          <div className="flex justify-between text-xs mb-4 w-full max-w-xs">
            <p>
              Don't have an Account?
              <a
                onClick={() => navigate(`/register?navNext=${navNext}`)}
                className="underline text-warning hover:cursor-pointer"
              >
                Register
              </a>
            </p>
            <a
              onClick={handleForgetPassword}
              className="underline text-warning hover:cursor-pointer "
            >
              Forget Password
            </a>
          </div>
          <label className="label">
            {error && (
              <span className="label-text-alt text-sm text-red-500">
                {error.message}
              </span>
            )}
          </label>
          <input
            type="submit"
            className="btn btn-warning w-full max-w-xs rounded-none"
            name=""
            value="Login"
          />
        </form>

        <SocialLogin navNext={navNext}></SocialLogin>
      </div>
    </div>
  );
};

export default Login;
