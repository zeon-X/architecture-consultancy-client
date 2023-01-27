import React, { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { auth } from "../../firebase.init";
import SocialLogin from "../../shared/SocialLogin/SocialLogin";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import LogoutFunc from "../../utilities/Functions/LogoutFunc";

const LoginModal = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fcnt, setFcnt] = useState(0);

  const [signInWithEmailAndPassword, user, loading1, error] =
    useSignInWithEmailAndPassword(auth);

  // FROM USE
  const {
    register,
    resetField,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //   !!!!!!! ------- SERVER RELATED FUNCTIONS -------- !!!!!!!!!!
  // FORGET PASSWORD
  const handleForgetPassword = () => {};

  // FIREBASE LOGIN
  const onSubmit = async (data) => {
    await signInWithEmailAndPassword(data?.email, data?.password);
  };

  // SERVER LOGIN AFTER FIREBASE LOGIN
  useEffect(() => {
    if (user && fcnt === 0) {
      setFcnt(1);
      setLoading(true);
      axiosInstance
        .post("auth/reglog", {
          profilePic: user?.user?.photoURL,
          name: user?.user?.displayName,
          email: user?.user?.email,
          userId: user?.user?.uid,
        })
        .then((res) => {
          //   console.log(res.data);
          setLoading(false);
          if (res?.status === 200) {
            console.log(res.data);
            localStorage.setItem(
              "authorization",
              `Bearer ${res?.data?.authorization}`
            );
            localStorage.setItem("user", JSON.stringify(res?.data?.user));
            Swal.fire({
              position: "center",
              icon: "success",
              title: `Welcome ${res?.data?.user?.name}!`,
              showConfirmButton: false,
              timer: 3000,
            });
            navigate("/");
          } else {
            Swal.fire("Error!", `Something went wrong`, "error");
            LogoutFunc(auth);
          }
        });
      setLoading(false);
    }
  }, [user]);

  // LODING AND SPINNERS
  if (loading || loading1) {
    return Swal.showLoading();
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
      <input type="checkbox" id="login-modal" className="modal-toggle" />
      <label htmlFor="login-modal" className="modal cursor-pointer">
        <label className="modal-box relative py-10" htmlFor="">
          <div className="">
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
                  className="input input-bordered w-full max-w-xs rounded"
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
              {/* Navigation LINKS */}
              <div className="flex justify-between text-xs mb-4 w-full max-w-xs">
                <p>
                  Don't have an Account?
                  <label
                    htmlFor="register-modal"
                    className="underline hover:cursor-pointer"
                  >
                    Register
                  </label>
                </p>
                <a
                  onClick={handleForgetPassword}
                  className="underline  hover:cursor-pointer "
                >
                  Forget Password
                </a>
              </div>
              {/* <label className="label">
                {error && (
                  <span className="label-text-alt text-sm text-red-500">
                    {error.message}
                  </span>
                )}
              </label> */}
              <input
                type="submit"
                className="btn  w-full max-w-xs rounded"
                name=""
                value="Login"
              />
            </form>

            <SocialLogin></SocialLogin>
          </div>
        </label>
      </label>
    </div>
  );
};

export default LoginModal;
