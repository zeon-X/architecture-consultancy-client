import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col h-screen w-full justify-center items-center ">
      <img
        className="w-48 h-48"
        src="https://cdn-icons-png.flaticon.com/512/5545/5545083.png"
        alt="error"
      />
      <p className="my-6 text-lg text-purple-500">Page Not Found</p>
    </div>
  );
};

export default NotFound;
