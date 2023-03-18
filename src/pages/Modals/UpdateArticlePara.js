import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";

const UpdateArticlePara = ({ index, props, propsData, setPropsData }) => {
  const [newParagraph, setNewParagraph] = useState("");
  const [newImg, setNewImg] = useState("");
  const [newParagraphFull, setNewParagraphFull] = useState("");
  const [newImgTags, setNewImgTags] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setNewParagraph(props?.paragraph);
    setNewParagraphFull(props?.paragraphFull);
    setNewImg(props?.img);
    setNewImgTags(props?.imgTags);
  }, [props]);

  //   ON CHANGE TITLE IT WILL UPDATE THE TITLE
  const handleParagraph = (event) => {
    setNewParagraph(event.target.value);
  };
  const handleParagraphFull = (event) => {
    setNewParagraphFull(event.target.value);
  };
  const handleImageTags = (event) => {
    setNewImgTags(event.target.value);
  };
  const handleLinkChange = (event) => {
    setNewImg(event.target.value);
  };

  // ON CHANGE IMAGE IT WILL ADD THE IMAGE
  const handleImageChange = async (event) => {
    let imagedata = new FormData();
    imagedata.append("file", event.target.files[0]);
    // console.log(event.target.files[0]);
    setLoading(true);

    await axiosInstance
      .post("/file/upload", imagedata)
      .then((res) => {
        //console.log(res);
        if (res.status === 200) {
          setNewImg(res?.data?.url);
          Swal.fire(
            "Saved!",
            `You have successfully added the Image.`,
            "success"
          ).then(() => {
            event.target.value = null;
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setLoading(false);
  };
  // console.log(propsData);

  const handleOnClickAddPara = () => {
    let temprops;
    temprops = propsData;
    temprops.articlePara[index].img = newImg;
    temprops.articlePara[index].imgTags = newImgTags;
    temprops.articlePara[index].paragraph = newParagraph;
    temprops.articlePara[index].paragraphFull = newParagraphFull;

    setPropsData(temprops);
  };

  return (
    <div className="flex flex-col gap-2 border border-gray-300 rounded-lg p-5">
      {/* --------single image ----------*/}

      {/* img file select */}
      <div className="form-control w-full ">
        <label className="label">
          <span className="">Add embed Youtube Video Link Here</span>
        </label>
        <input
          type="text"
          name="videolink"
          value={newImg}
          onChange={handleLinkChange}
          className="input input-bordered text-xs rounded w-full "
        />
        <div className="divider">OR</div>
        <label className="label">
          <span className="">Image</span>
        </label>
        <input
          type="file"
          name="img"
          onChange={handleImageChange}
          className="input input-bordered text-xs rounded w-full "
        />
      </div>
      <div className="my-4">
        <p className="btn btn-xs mb-1">Current Image</p>

        <img className="rounded-lg h-40" src={newImg} alt="" />
      </div>
      {/* image  tags*/}
      <div className="form-control w-full ">
        <label className="label">
          <span className="">Image Tags</span>
        </label>
        <input
          onChange={handleImageTags}
          value={newImgTags}
          type="text"
          className="input input-bordered text-xs rounded w-full"
        />
      </div>
      {/* paragraph side to the image */}
      <div className="form-control w-full ">
        <label className="label">
          <span className="">Paragraph side with the image</span>
        </label>
        <textarea
          onChange={handleParagraph}
          value={newParagraph}
          type="text"
          className="textarea textarea-bordered rounded text-xs h-24"
        />
      </div>

      {/* paragraph down to the image */}
      <div className="form-control w-full ">
        <label className="label">
          <span className="">Paragraph down to the image</span>
        </label>
        <textarea
          onChange={handleParagraphFull}
          value={newParagraphFull}
          type="text"
          className="textarea textarea-bordered rounded text-xs h-24"
        />
      </div>
      {/* add btn */}
      <p
        onClick={handleOnClickAddPara}
        className={
          newImg !== props?.img ||
          newParagraph !== props?.paragraph ||
          newParagraphFull !== props?.paragraphFull ||
          newImgTags !== props?.imgTags
            ? "btn btn-wide"
            : "btn btn-wide btn-disabled"
        }
      >
        Update Para
      </p>
    </div>
  );
};

export default UpdateArticlePara;
