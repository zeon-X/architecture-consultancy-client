import React from "react";
import logo from "../assets/logo/logoi.webp";
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
  let fotterBgImage =
    "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80";
  let year = new Date().getFullYear();
  const navigate = useNavigate();
  return (
    <footer
      // style={{ backgroundImage: `url(${fotterBgImage})` }}
      id="contact-us"
      className="lg:px-20 lg:py-16 sm:p-10 bg-[#000000da] text-base-content grid grid-cols-1 justify-center items-center bg-cover bg-center"
    >
      <div className="flex lg:flex-row sm:flex-col gap-6 justify-between items-start w-full h-full max-w-7xl mx-auto text-white ">
        {/* site name */}
        <div className="flex flex-col items-start justify-start h-full max-w-[300px]">
          <p className="text-lg font-semibold pb-10">Imran's Creation</p>
          <img className="w-36 h-36" src={logo} alt="" />
        </div>
        {/* contact us */}
        <div className="max-w-[300px]">
          <p className="text-lg font-semibold mb-10">Contact Us</p>
          <p className="text-sm mb-3 text-gray-400 ">
            House no-20, Block E, Future Town, Mohammadpur, Basila, 40 feet
            road, Dhaka, Bangladesh
          </p>
          <p className="text-sm mb-3 text-gray-400">+8801774803059</p>
          <p className="text-sm mb-3 text-gray-400">
            contact@imranscreation.com
          </p>
        </div>
        {/* site map */}
        <div className="flex flex-col max-w-[300px]">
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
        <div className="max-w-[300px]">
          <p className="text-lg font-semibold mb-10">Get a Free consulation</p>
          <p className="text-sm mb-4 text-gray-400">
            Be informormed about our services. Ask for free consulation now!
          </p>

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
