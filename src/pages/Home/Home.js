import React from "react";
import HomeSection1 from "./HomeSection1";
import HomeSection2 from "./HomeSection2";
import HomeSection3 from "./HomeSection3";
import HomeSection4 from "./HomeSection4";
import HomeSection5 from "./HomeSection5";
import "./Home.css";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="lg:px-20 py-16 sm:px-8 flex flex-col justify-center items-center">
        <HomeSection1></HomeSection1>
        <HomeSection2></HomeSection2>
      </div>
      <HomeSection3></HomeSection3>
      <div className="lg:px-20 py-16 sm:px-8 flex flex-col justify-center items-center">
        <HomeSection4></HomeSection4>
        <HomeSection5></HomeSection5>
      </div>
    </div>
  );
};

export default Home;
