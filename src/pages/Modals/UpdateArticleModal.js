import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import UpdateArticlePara from "./UpdateArticlePara";
import { useQuery } from "react-query";

const UpdateArticleModal = ({ props, increaseChanges, changes }) => {
  // ADDING PARA FUNC
  const [propsData, setPropsData] = useState(props);
  //   const [articlePara, setArticlePara] = useState([]);
  const [newParagraph, setNewParagraph] = useState("");
  const [newImg, setNewImg] = useState("");
  const [loading, setLoading] = useState(false);

  // REACT FORM HOOKS
  const {
    register,
    resetField,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return props;
    }, [props]),
  });

  // category fetching.
  const {
    isLoading,
    isError,
    data: category,
    error,
  } = useQuery(["AllServiceCategory"], async ({}) => {
    return await axiosInstance.get("service-category/get");
  });

  useEffect(() => {
    reset(props);
    setPropsData(props);
  }, [props]);

  //   ON CHANGE TITLE IT WILL UPDATE THE TITLE
  const handleParagraph = (event) => {
    setNewParagraph(event.target.value);
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
    if (newParagraph != "" && newImg != "") {
      let temPropsData = propsData;
      temPropsData.articlePara.push({
        img: newImg,
        paragraph: newParagraph,
      });

      setPropsData(temPropsData);

      setNewImg("");
      setNewParagraph("");
    }
  };

  //SUBMIL FUNCTION
  const onSubmit = async (data) => {
    Swal.showLoading();

    //   ASSEMBLYING DATA
    let temData = propsData;
    temData.articleTitle = data?.articleTitle;
    temData.slug = data?.slug;
    temData.categoryId = data?.categoryId;
    data = temData;

    // console.log(data);

    // SENDING DATA TO MONGO-DB DATABASE
    await axiosInstance
      .put(`article/update?_id=${props?._id}`, data)
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          Swal.fire(
            "Updated!",
            `You have successfully updated the Article.`,
            "success"
          ).then(() => {
            increaseChanges(changes + 1);
          });
        } else {
          Swal.fire("Error!", `Something went wrong`, "error");
        }
        //   console.log(res.data);
      });
  };

  return (
    <div>
      <input
        type="checkbox"
        id="update-article-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-auto max-w-5xl">
          <div className="py-6 lg:px-10 md:px-10 sm:px-2  w-full">
            <p className="text-sm font-bold pt-16">Update a Article</p>

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

                {/* category----- */}
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="">Service Category</span>
                  </label>
                  <select
                    {...register("categoryId", {
                      required: false,
                      message: "This field is required",
                    })}
                    className="select select-bordered"
                  >
                    <option disabled selected>
                      Choose a category
                    </option>
                    {category?.data?.map((x) => {
                      return (
                        <option
                          key={x?._id}
                          label={x?.categoryTitle}
                          value={x?._id}
                        ></option>
                      );
                    })}
                  </select>
                  {errors.categoryId && (
                    <label className="label">
                      <span className="-alt text-sm text-red-500">
                        This field is required
                      </span>
                    </label>
                  )}
                </div>
              </div>

              <p className="font-semibold  mt-16 mb-3">
                Article Image and paragraph
              </p>

              <p className="text-red-600 uppercase mb-2">
                If update photo to youtube video just paste the youtube link and
                don't touch the image
              </p>
              <div className="">
                {props?.articlePara?.map((x, index) => {
                  return (
                    <UpdateArticlePara
                      key={index}
                      index={index}
                      props={x}
                      propsData={propsData}
                      setPropsData={setPropsData}
                    ></UpdateArticlePara>
                  );
                })}
              </div>

              <p className="font-semibold  mt-16 mb-3">
                Add a new Article section to the end (Image and paragraph)
              </p>
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
                {/* paragraph */}
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="">Paragraph with the image</span>
                  </label>
                  <textarea
                    onChange={handleParagraph}
                    value={newParagraph}
                    type="text"
                    name="aboutLeft"
                    className="textarea textarea-bordered rounded text-xs h-24"
                  />
                </div>
                {/* add btn */}
                <p
                  onClick={handleOnClickAddPara}
                  className={
                    newImg != "" && newParagraph != ""
                      ? "btn btn-wide"
                      : "btn btn-wide btn-disabled"
                  }
                >
                  Add Para to the end
                </p>
              </div>

              {/* SUBMIT BTN */}
              <div className="w-full flex justify-center items-center">
                <input
                  type="submit"
                  value="Update Article"
                  className="btn btn-warning w-full max-w-xs rounded mt-10"
                ></input>
              </div>
            </form>
          </div>

          {/* modal action */}
          <div className="modal-action w-full">
            <label
              htmlFor="update-article-modal"
              className="btn btn-xs mx-auto bg-red-600 text-white border-none"
            >
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateArticleModal;
