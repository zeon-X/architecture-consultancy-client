import React from "react";
import card1 from "../assets/footer/card1.png";
import card2 from "../assets/footer/card2.png";
import card3 from "../assets/footer/card3.png";
import card4 from "../assets/footer/card4.png";
import card5 from "../assets/footer/card5.png";
import card6 from "../assets/footer/card6.png";
import card7 from "../assets/footer/card7.png";
import card8 from "../assets/footer/card8.png";

const Footer = () => {
  return (
    <footer className="lg:p-20 sm:p-10 bg-gray-100 text-base-content grid grid-cols-1 justify-center items-center">
      <div className="mx-auto mb-16  flex flex-col justify-center items-center">
        <p className="text-3xl">Sign Up For Newsletters</p>
        <p className="text-sm mb-4">
          Get e-mail updates about our latest shop and special offers.
        </p>

        <div className="form-control lg:w-96 sm:w-72">
          <div className="relative">
            <input
              type="text"
              placeholder="username@site.com"
              className="input input-bordered w-full pr-16"
            />
            <button className="btn btn-warning absolute top-0 right-0 rounded-l-none">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="flex lg:flex-row sm:flex-col">
        <div className="lg:w-4/12 sm:w-full lg:pr-20 sm:pr-0 lg:mb-0 sm:mb-6">
          <span className="footer-title">Contact Us</span>
          <div className="flex justify-start items-center mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>

            <span className="text-sm">Address : Dhaka, Bangladesh</span>
          </div>
          <div className="flex justify-start items-center my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>

            <span className="text-sm">Mail Us : aleeha@aleeha.com</span>
          </div>
          <div className="flex justify-start items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>

            <span className="text-sm">Phone: +88011223344</span>
          </div>

          <div className="grid grid-cols-5 mt-6">
            <img className="w-10" src={card1} alt="" />
            <img className="w-10" src={card2} alt="" />
            <img className="w-10" src={card3} alt="" />
            <img className="w-10" src={card4} alt="" />
            <img className="w-10" src={card5} alt="" />
            <img className="w-10" src={card6} alt="" />
            <img className="w-10" src={card7} alt="" />
            <img className="w-10" src={card8} alt="" />
          </div>
        </div>
        <div className="lg:w-8/12 sm:w-full grid lg:grid-cols-4 sm:grid-cols-2 justify-between items-start gap-6">
          <div className="grid grid-cols-1 ">
            <span className="footer-title">Information</span>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </div>
          <div className="grid grid-cols-1 ">
            <span className="footer-title">Account</span>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </div>
          <div className="grid grid-cols-1 ">
            <span className="footer-title">Customer Service</span>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
            <a className="link link-hover">Privacy policy</a>
          </div>
          <div className="grid grid-cols-1 ">
            <span className="footer-title">Let Us Help You</span>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
            <a className="link link-hover">Privacy policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
