import React from "react";
import { useNavigate } from "react-router-dom";
import pricing from "../../JSON/PricingJSON";

const PricingPlan = () => {
  const navigate = useNavigate();
  return (
    <section id="pricing-top" className="max-w-7xl mx-auto py-16 px-4 w-full">
      <div className="">
        <p className="text-sm text-black tracking-widest uppercase text-center">
          Pricing Plans
        </p>
        <p className="text-3xl font-semibold text-gray-800 mt-3 mb-8 text-center">
          Make teamwork more productive.
        </p>
      </div>
      {/* FREE CONSULTATIONS */}
      <div className="bg-yellow-100 rounded-xl p-8 flex lg:flex-row sm:flex-col gap-10 justify-between items-center mb-6 mt-16  border border-gray-100">
        <div>
          <p className="text-2xl font-semibold uppercase">free consultation!</p>
          <p className="text-sm text-gray-600 ">
            You may ask for consulation which is free of cost!
          </p>
        </div>
        <button className="btn btn-wide bg-green-600 border-none text-white">
          Get Now
        </button>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 justify-center  gap-4">
        {pricing?.map((x) => {
          return (
            <div
              className={
                "flex flex-col justify-between gap-6 shadow px-6 py-10 rounded-lg border border-gray-100 mt-2 "
              }
            >
              <p className="text-xl font-semibold">{x?.title}</p>
              <p className=" text-gray-500 text-sm">{x?.detail}</p>
              <div>
                <div className="flex flex-col gap-3 mt-4 text-sm">
                  {x?.specification?.map((xx) => {
                    return (
                      <div className="flex gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={xx?.value === 1 ? "green" : "currentColor"}
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                            clipRule="evenodd"
                          />
                        </svg>

                        <p className=" text-gray-500">{xx?.heading}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <button
                  onClick={() => {
                    navigate(`/order/${x?.dynamicLink}`);
                  }}
                  className="btn bg-green-600 border-none text-white w-full"
                >
                  Get Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PricingPlan;
