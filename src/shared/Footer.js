import React from "react";

const Footer = () => {
  const social = [
    {
      img: "https://cdn-icons-png.flaticon.com/512/717/717392.png",
      link: "",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/1532/1532439.png",
      link: "",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/160/160154.png",
      link: "",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/160/160154.png",
      link: "",
    },
  ];
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
        <div className="">
          <p className="text-lg font-semibold mb-10">Site map</p>
          <p className="text-sm mb-3 text-gray-400">Home</p>
          <p className="text-sm mb-3 text-gray-400">Pages</p>
          <p className="text-sm mb-3 text-gray-400">Portfolio</p>
          <p className="text-sm mb-3 text-gray-400">Landing</p>
          <p className="text-sm mb-3 text-gray-400">Contact</p>
        </div>
        {/* sign uo to date */}
        <div className="">
          <p className="text-lg font-semibold mb-10">
            Sign up to stay up to date
          </p>
          <p className="text-sm mb-3 text-gray-400">
            Subscribe to our newsletter to be in the know
          </p>
          <input
            type="text"
            placeholder="Enter Email Address Here"
            className="my-4 text-xs bg-transparent rounded-none border-b border-gray-400 w-full"
          ></input>
          <div>
            <button className="text-sm mb-3 text-gray-400 px-6 py-2 border border-gray-400">
              Subscribe
            </button>
          </div>

          {/* social */}
          <div className="grid grid-cols-4 gap-3 mt-6">
            {social?.map((x, index) => {
              return (
                <a key={index} target="_blank" href={x?.link}>
                  <img className="w-6 h-6" src={x?.img} alt="" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <p className="w-full text-center text-xs text-white mt-16">
        COPYRIGHT 2021 © ALEEHA-TECH. ALL RIGHTS RESERVED.
      </p>
    </footer>
  );
};

export default Footer;
