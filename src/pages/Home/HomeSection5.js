import React from "react";

const HomeSection5 = () => {
  const review = [
    {
      reviewTitle: "very professional",
      review:
        "Mauris aliquet nisi vel lacus placerat ultricies. Curabitur accumsan felis sapien, sit amet volutpat",
      img: "https://images.unsplash.com/photo-1592334873219-42ca023e48ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3w3NjA4Mjc3NHx8ZW58MHx8fHw%3D&w=1000&q=80",
      name: "Devid Backhum",
      designation: "CEO, Heavy Steals",
    },
    {
      reviewTitle: "very professional",
      review:
        "Mauris aliquet nisi vel lacus placerat ultricies. Curabitur accumsan felis sapien, sit amet volutpat",
      img: "https://images.unsplash.com/photo-1592334873219-42ca023e48ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3w3NjA4Mjc3NHx8ZW58MHx8fHw%3D&w=1000&q=80",
      name: "Devid Backhum",
      designation: "CEO, Heavy Steals",
    },
    {
      reviewTitle: "very professional",
      review:
        "Mauris aliquet nisi vel lacus placerat ultricies. Curabitur accumsan felis sapien, sit amet volutpat",
      img: "https://images.unsplash.com/photo-1592334873219-42ca023e48ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3w3NjA4Mjc3NHx8ZW58MHx8fHw%3D&w=1000&q=80",
      name: "Devid Backhum",
      designation: "CEO, Heavy Steals",
    },
  ];

  return (
    <section id="hs5" className="py-16 w-full ">
      <div className="">
        <p className="text-sm text-black tracking-widest uppercase text-center">
          THEY REMEMBER US
        </p>
        <p className="text-3xl font-semibold text-gray-800 mt-3 mb-8 text-center">
          What’s clients say about us
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 justify-center items-center mt-16">
        {review.map((x) => {
          return (
            <div className="review-card p-10">
              <p className="font-semibold uppercase tracking-wide">
                {x.reviewTitle}
              </p>
              <p className="text-xs text-gray-400 mt-3">{x.review}</p>

              <div className="border-b border-gray-300 mt-8 mb-4"></div>

              <div className="flex gap-3 items-center">
                <img className="rounded-full w-9" src={x.img} alt="" />

                <div>
                  <p className="text-xs font-semibold">{x.name}</p>
                  <p className="text-xs">{x.designation}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HomeSection5;
