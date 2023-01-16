import React from "react";
import "./Loading.css";

const Loading = ({ msg }) => {
  return (
    <div className="flex flex-col h-screen w-full justify-center items-center">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="text-sm">{msg}</p>
    </div>
  );
};

export default Loading;
