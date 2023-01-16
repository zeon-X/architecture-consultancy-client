import React, { useEffect, useState } from "react";
import { auth } from "../../firebase.init";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import Swal from "sweetalert2";
import LogoutFunc from "../../utilities/Functions/LogoutFunc";

const SocialLogin = ({ navNext }) => {
  const [loading1, setLoading1] = useState(false);
  const [cnt, setCnt] = useState(0);

  const navigate = useNavigate();
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const handleGoogleLogin = async () => {
    await signInWithGoogle();
    setLoading1(true);
  };

  useEffect(() => {
    if (user && cnt === 0) {
      setCnt(1);
      axiosInstance
        .post("auth/reglog", {
          email: user.user.email,
          userId: user.user.uid,
          profile_pic: user?.user?.photoURL,
          name: user?.user?.displayName,
        })
        .then((res) => {
          setLoading1(false);
          if (res?.status === 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: `Welcome !`,
              showConfirmButton: true,
              timer: 3000,
            });

            // console.log(res.data.user_data.status);

            // console.log(res.data);
            localStorage.setItem(
              "authorization",
              `Bearer ${res?.data?.authorization}`
            );
            localStorage.setItem("user", JSON.stringify(res?.data?.user));
            navigate(navNext || "/");
          } else {
            LogoutFunc(auth);
          }
        });
    }
  }, [user]);

  if (loading || loading1) {
    Swal.showLoading();
  }

  return (
    <div>
      <p className="font-bold text-2xl text-center w-full">OR</p>
      <p className="text-xs text-center border-t border-dashed pt-2 mt-1 border-gray-200 w-full">
        Login Using Social
      </p>
      {error && <p className="text-xs text-red-500">{error.message}</p>}
      <div className="flex justify-center items-center gap-3 mt-6">
        <button onClick={handleGoogleLogin} className="btn btn-warning">
          <img
            className="w-5 h-5"
            src="https://cdn-icons-png.flaticon.com/512/104/104093.png"
            alt=""
          />
        </button>
        <button className="btn btn-warning">
          <img
            className="w-5 h-5"
            src="https://cdn-icons-png.flaticon.com/512/2175/2175193.png"
            alt=""
          />
        </button>
        <button className="btn btn-warning">
          <img
            className="w-5 h-5"
            src="https://cdn-icons-png.flaticon.com/512/733/733609.png"
            alt=""
          />
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
