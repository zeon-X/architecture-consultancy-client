import React from "react";
import HomeSection1 from "./HomeSection1";
import HomeSection2 from "./HomeSection2";
import HomeSection3 from "./HomeSection3";
import HomeSection4 from "./HomeSection4";
import HomeSection5 from "./HomeSection5";
import "./Home.css";
import HomeSection0 from "./HomeSection0";
import HomeSection6 from "./HomeSection6";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <HomeSection0></HomeSection0>
      <div className="max-w-7xl px-4 flex flex-col justify-center items-center">
        <HomeSection1></HomeSection1>
        <HomeSection2></HomeSection2>
      </div>
      <HomeSection3></HomeSection3>
      <div className="max-w-7xl py-16 px-4 flex flex-col justify-center items-center">
        <HomeSection4></HomeSection4>
      </div>
      <HomeSection5></HomeSection5>

      <HomeSection6></HomeSection6>
    </div>
  );
};

export default Home;
