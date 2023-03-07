import React, { useEffect, useState } from "react";
import HomeSection1 from "./HomeSection1";
import HomeSection2 from "./HomeSection2";
import HomeSection3 from "./HomeSection3";
import HomeSection4 from "./HomeSection4";
import HomeSection5 from "./HomeSection5";
import "./Home.css";
import HomeSection0 from "./HomeSection0";
import HomeSection6 from "./HomeSection6";
import { useQuery } from "react-query";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import HomeSection1Additional from "./HomeSection1Additional";
import Loading from "../../shared/Loading";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <HomeSection0></HomeSection0>
      <div className="max-w-7xl w-full px-4 flex flex-col justify-center items-center">
        <HomeSection1></HomeSection1>
        <HomeSection1Additional props={1}></HomeSection1Additional>
        <HomeSection2></HomeSection2>
        <HomeSection1Additional props={2}></HomeSection1Additional>
      </div>
      <HomeSection3></HomeSection3>
      <div className="max-w-7xl w-full py-16 px-4 flex flex-col justify-center items-center">
        <HomeSection4></HomeSection4>
      </div>
      <HomeSection5></HomeSection5>

      <HomeSection6></HomeSection6>
    </div>
  );
};

export default Home;
