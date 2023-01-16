import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase.init";
import ErrorPage from "../../shared/ErrorPage";
import Loading from "../../shared/Loading";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";

const MyProfile = () => {
  const [user, loading, error2] = useAuthState(auth);
  const navigate = useNavigate();
  const {
    isLoading,
    isError,
    data: userInfo,
    error,
  } = useQuery(["userdatafetch"], async () => {
    let url = `user/find-by-email?email=${user?.email}`;
    let fetchedData = await axiosInstance.get(url);
    if (fetchedData?.status === 200)
      localStorage.setItem("user", JSON.stringify(fetchedData?.data[0]));
    return fetchedData?.data[0];
  });

  // const userId = ;
  const {
    isLoading1,
    isError1,
    data: userReview,
    error1,
  } = useQuery(["userreviewfetch"], async () => {
    let url = `review/find-by-email?email=${user?.email}`;
    let fetchedReview = await axiosInstance.get(url);
    return fetchedReview?.data;
  });

  if (isError || isError1) return <ErrorPage msg={"error"}></ErrorPage>;

  if (isLoading || loading || isLoading1)
    return <Loading msg="Loading..."></Loading>;

  const handleEditProfile = () => {
    navigate("/dashboard/my-account-update");
  };

  return (
    <div className="py-6 lg:px-10 md:px-10 sm:px-2 w-full">
      <div className="flex justify-between">
        <p className="text-sm font-bold">Account Details</p>
        <button
          onClick={handleEditProfile}
          className="btn btn-circle btn-sm btn-outline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
          </svg>
        </button>
      </div>
      <div className="text-sm grid lg:grid-cols-2 sm:grid-cols-1 gap-10 mt-4">
        <div className="mt-4">
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img
                src={
                  userInfo?.profile_pic
                    ? userInfo?.profile_pic
                    : "https://placeimg.com/192/192/people"
                }
              />
            </div>
          </div>
          <p className="mt-4">Email: {userInfo?.email}</p>
          <p className="my-2">Name: {userInfo?.name}</p>
          <p>Phone: {userInfo?.phone} </p>
          <p className="my-2">UserId: {userInfo?.userId} </p>
          <p>
            Role: <span className="badge">{userInfo?.role}</span>
          </p>
          <p></p>
        </div>
        <div>
          <div>
            <p className=" text-xs font-bold mb-2">Education</p>
            <div className="p-3 text-xs border border-gray-300 border-dashed">
              {userInfo?.education?.map((x, index) => {
                return <p key={index}>{x}</p>;
              })}
            </div>
          </div>
          <div className="my-6">
            <p className=" text-xs font-bold mb-2">Loaction</p>
            <div className="p-3 text-xs  border border-gray-300 border-dashed">
              <p>{userInfo?.address}</p>
            </div>
          </div>
          <div>
            <p className=" text-xs font-bold mb-2">Social Links</p>
            <div className="p-3 text-xs border border-gray-300 border-dashed">
              {userInfo?.socialLinks?.map((x, index) => {
                return (
                  <div key={index} className="flex justify-between">
                    <p className="font-semibold">{x?.key}</p>
                    <a target="_blank" href={x?.value} className="underline">
                      view profile
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {userInfo?.role === "user" && (
            <div>
              <p className=" text-xs font-bold mb-2 mt-4">My Reviews</p>
              <div className="p-3 border border-gray-300 border-dashed">
                <div className="flex text-xs gap-1">
                  <p className="w-3/12 underline">Rating</p>
                  <p className="w-9/12 underline">Comment</p>
                </div>
                {userReview?.map((x, index) => {
                  return (
                    <div key={index} className="flex text-xs gap-1">
                      <p className="w-3/12">{x?.rating}</p>
                      <p className="w-9/12">{x?.comment?.slice(0, 20)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
