import React, { useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import axios from "axios";

const AddArticle = () => {
  const [loading, setLoading] = useState(false);

  // REACT FORM HOOKS
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ADDING PARA FUNC
  const [articlePara, setArticlePara] = useState([]);
  const [newParagraph, setNewParagraph] = useState("");
  const [newParagraphFull, setNewParagraphFull] = useState("");
  const [newImg, setNewImg] = useState("");
  const [newImgTags, setNewImgTags] = useState("");

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

  const handleOnClickAddPara = () => {
    if (newParagraph !== "" && newImg !== "") {
      let temArticleArr = articlePara;
      temArticleArr.push({
        img: newImg,
        imgTags: newImgTags,
        paragraph: newParagraph,
        paragraphFull: newParagraphFull,
      });
      setNewImg("");
      setNewImgTags("");
      setNewParagraph("");
      setNewParagraphFull("");
      setArticlePara(temArticleArr);
    }
  };

  //SUBMIL FUNCTION
  const onSubmit = async (data) => {
    Swal.showLoading();

    //   ASSEMBLYING DATA
    data.articlePara = articlePara;
    console.log(data);

    //SENDING DATA TO MONGO-DB DATABASE
    await axiosInstance.post("article/create", data).then((res) => {
      setLoading(false);
      if (res.status === 201) {
        Swal.fire(
          "Saved!",
          `You have successfully added the Article.`,
          "success"
        ).then(() => {
          resetField("articleTitle");
          setArticlePara([]);
        });
      } else {
        Swal.fire("Error!", `Something went wrong`, "error");
      }
      //   console.log(res.data);
    });
  };

  if (loading === true) Swal.showLoading();

  return (
    <div className="w-full py-6 lg:px-10 md:px-10 sm:px-2  max-w-7xl mx-auto">
      <p className="text-sm font-bold">Add a Article</p>

      <form className="mt-4 text-xs" onSubmit={handleSubmit(onSubmit)}>
        {/* BLOG TITE */}
        <div className="grid lg:grid-cols-1 sm:grid-cols-1 gap-4">
          {/* Article TITLE  */}
          <div className="form-control w-full ">
            <label className="label">
              <span className="">Article Title</span>
            </label>
            <input
              type="text"
              name="articleTitle"
              className="input input-bordered text-xs rounded w-full "
              {...register("articleTitle", {
                required: true,
                message: "This field is required",
              })}
            />
            {errors.articleTitle && (
              <label className="label">
                <span className="-alt text-sm text-red-500">
                  This field is required
                </span>
              </label>
            )}
          </div>
          {/* Article Slug  */}
          <div className="form-control w-full ">
            <label className="label">
              <span className="">
                Article Slug {"(use dash - between each word)"}
              </span>
            </label>
            <input
              type="text"
              name="slug"
              className="input input-bordered text-xs rounded w-full "
              {...register("slug", {
                required: true,
                message: "This field is required",
              })}
            />
            {errors.slug && (
              <label className="label">
                <span className="-alt text-sm text-red-500">
                  This field is required
                </span>
              </label>
            )}
          </div>
        </div>

        <p className="font-semibold  mt-16 mb-3">Article Image and paragraph</p>

        <div className="grid lg:grid-cols-1 sm:grid-cols-1 gap-5 border border-gray-300 rounded-lg mb-16 p-5">
          {/* --------single image ----------*/}

          {/* img file select */}
          <div className="form-control w-full ">
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
              newImg !== "" && newParagraph !== ""
                ? "btn btn-wide"
                : "btn btn-wide btn-disabled"
            }
          >
            Add Para
          </p>
        </div>

        {/* DISPLAY ADDED PARA */}
        <div className="my-16 ">
          <p className="font-semibold underline mb-8">
            Added Article Para Here for review
          </p>
          <div className="">
            {articlePara?.map((x, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-wrap gap-4 p-5 border border-gray-300 rounded-lg my-2"
                >
                  {/* added img */}
                  <img className="rounded-lg w-4/12" src={x?.img} alt="" />
                  {/* added paragraph */}
                  <p className="w-7/12">{x?.paragraph}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* SUBMIT BTN */}
        <div className="w-full flex justify-center items-center">
          <input
            type="submit"
            value="Add Article"
            className="btn btn-warning w-full max-w-xs rounded mt-10"
          ></input>
        </div>
      </form>
      {/* submit  */}
    </div>
  );
};

export default AddArticle;
