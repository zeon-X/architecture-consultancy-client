import React from "react";

const HomeSection6 = () => {
  const pricing = [
    {
      title: "Free",
      detail:
        "Lorem ipsum dolor sit amet, consect adipiscing elit. Ut elit tellus",
      price: 0,
      specification: [
        {
          heading: "One project",
          value: 1,
        },
        {
          heading: "Your dashboard",
          value: 1,
        },
        {
          heading: "Components Included",
          value: 1,
        },
        {
          heading: "Advanced controls",
          value: 0,
        },
        {
          heading: "Chat supports",
          value: 0,
        },
        {
          heading: "Unlimited Users",
          value: 0,
        },
      ],
    },
    {
      title: "Standard",
      detail:
        "Lorem ipsum dolor sit amet, consect adipiscing elit. Ut elit tellus",
      price: 650,
      specification: [
        {
          heading: "One project",
          value: 1,
        },
        {
          heading: "Your dashboard",
          value: 1,
        },
        {
          heading: "Components Included",
          value: 1,
        },
        {
          heading: "Advanced controls",
          value: 1,
        },
        {
          heading: "Chat supports",
          value: 0,
        },
        {
          heading: "Unlimited Users",
          value: 0,
        },
      ],
    },
    {
      title: "Plus",
      detail:
        "Lorem ipsum dolor sit amet, consect adipiscing elit. Ut elit tellus",
      price: 1250,
      specification: [
        {
          heading: "One project",
          value: 1,
        },
        {
          heading: "Your dashboard",
          value: 1,
        },
        {
          heading: "Components Included",
          value: 1,
        },
        {
          heading: "Advanced controls",
          value: 1,
        },
        {
          heading: "Chat supports",
          value: 1,
        },
        {
          heading: "Unlimited Users",
          value: 0,
        },
      ],
    },
    {
      title: "Enterprise",
      detail:
        "Lorem ipsum dolor sit amet, consect adipiscing elit. Ut elit tellus",
      price: 2500,
      specification: [
        {
          heading: "One project",
          value: 1,
        },
        {
          heading: "Your dashboard",
          value: 1,
        },
        {
          heading: "Components Included",
          value: 1,
        },
        {
          heading: "Advanced controls",
          value: 1,
        },
        {
          heading: "Chat supports",
          value: 1,
        },
        {
          heading: "Unlimited Users",
          value: 1,
        },
      ],
    },
  ];

  return (
    <section id="hs6" className="py-16 w-full ">
      <div className="">
        <p className="text-sm text-black tracking-widest uppercase text-center">
          Pricing Plans
        </p>
        <p className="text-3xl font-semibold text-gray-800 mt-3 mb-8 text-center">
          Make teamwork more productive.
        </p>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {pricing?.map((x) => {
          return (
            <div
              className={
                "flex flex-col gap-6 shadow px-6 py-10 rounded-lg border border-gray-100 mt-2"
              }
            >
              {/* 
                x?.title === "Standard"
                  ? "flex flex-col gap-6 shadow-lg px-6 py-10 rounded-lg border-2 border-gray-400 mb-2"
                  : "flex flex-col gap-6 shadow px-6 py-10 rounded-lg border border-gray-100 mt-2"
              */}
              {/* basic */}
              <p className="text-xl font-semibold">{x?.title}</p>
              <p className=" text-gray-500 text-sm">{x?.detail}</p>
              <p className="text-xl font-semibold">
                ${x?.price} USD /<span className="text-sm">Mo</span>
              </p>

              {/* btn */}
              <div>
                <button className="btn bg-green-600 border-none text-white w-full">
                  Get Now
                </button>
              </div>
              {/* options */}
              <div className="flex flex-col gap-4 mt-6 text-sm">
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

                      <p className="text-gray-500">{xx?.heading}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HomeSection6;
