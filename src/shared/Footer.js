import React from "react";

import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const social = [
    {
      img: "https://cdn-icons-png.flaticon.com/512/3670/3670147.png",
      link: "https://www.youtube.com/@ImransCreation",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/3955/3955024.png",
      link: "https://www.instagram.com/imranscreation/",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/145/145802.png",
      link: "https://www.facebook.com/eng.imranh",
    },
  ];

  let year = new Date().getFullYear();
  const navigate = useNavigate();
  return (
    <footer
      id="contact-us"
      className="lg:px-20 lg:py-16 sm:p-10 bg-[#000000da] text-base-content grid grid-cols-1 justify-center items-center"
    >
      <div className="flex lg:flex-row sm:flex-col gap-6 justify-between items-start w-full h-full max-w-7xl mx-auto text-white">
        {/* site name */}
        <div className="flex items-start justify-start h-full">
          <p className="text-lg font-semibold pb-10">Imran's Creation</p>
        </div>
        {/* contact us */}
        <div className="">
          <p className="text-lg font-semibold mb-10">Contact Us</p>
          <p className="text-sm mb-3 text-gray-400 ">
            2972 Westheimer Rd. Santa Ana, Illinois 85486
          </p>
          <p className="text-sm mb-3 text-gray-400">(907) 555-0101</p>
          <p className="text-sm mb-3 text-gray-400">
            nathan.roberts@example.com
          </p>
        </div>
        {/* site map */}
        <div className="flex flex-col">
          <p className="text-lg font-semibold mb-10">Site map</p>
          <a href="/#hs0" className="text-sm mb-3 text-gray-400">
            Home
          </a>
          <a href="/#hs1" className="text-sm mb-3 text-gray-400">
            Who we are
          </a>
          <a href="/#hs2" className="text-sm mb-3 text-gray-400">
            Services
          </a>
          <a href="/#hs3" className="text-sm mb-3 text-gray-400">
            Our Latest Work
          </a>
          <a href="/blog" className="text-sm mb-3 text-gray-400">
            Our Blog
          </a>
        </div>
        {/* sign uo to date */}
        <div className="">
          <p className="text-lg font-semibold mb-10">Get a Free consulation</p>
          <p className="text-sm mb-3 text-gray-400">
            Consulation is free. Be informormed about our services.
          </p>
          {/* <input
            type="text"
            placeholder="Enter Email Address Here"
            className="my-4 text-xs bg-transparent rounded-none border-b border-gray-400 w-full"
          ></input> */}
          <div>
            <button
              onClick={() => navigate("/pricing/#pricing-top")}
              className="text-sm mb-3 px-6 py-3 box "
            >
              Get A Quick Quote
            </button>
          </div>

          {/* social */}
          <div className="grid grid-cols-5 gap-3 mt-6">
            {social?.map((x, index) => {
              return (
                <a key={index} target="_blank" href={x?.link}>
                  <img className="w-10 h-10" src={x?.img} alt="" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <p className="w-full text-center text-xs text-white mt-16">
        COPYRIGHT {year} © ALL RIGHTS RESERVED | DEVELOPED BY{" "}
        <a
          className="text-red-500"
          target="_blank"
          href="https://www.aleehatech.com"
        >
          ALEEHA-TECH.
        </a>
      </p>
    </footer>
  );
};

export default Footer;
