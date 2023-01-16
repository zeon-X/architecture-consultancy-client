import React from "react";

const ErrorPage = ({ msg }) => {
  return (
    <div className="flex flex-col h-screen w-full justify-center items-center ">
      <img
        className="w-24 h-24"
        src="https://cdn-icons-png.flaticon.com/512/2581/2581801.png"
        alt="error"
      />
      <p className="text-sm font-bold mt-4">{msg}</p>
    </div>
  );
};

export default ErrorPage;
