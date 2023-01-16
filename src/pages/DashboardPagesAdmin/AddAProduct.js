import axios from "axios";
import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import Loading from "../../shared/Loading";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";

const AddAProduct = () => {
  const API = "319969b2b7f96e580b0f112231e21ca5";
  const [loading, setLoading] = useState(false);
  const [specification, setSpecification] = useState([]);

  const keyRef = useRef(null);
  const valueRef = useRef(null);
  const handleSpecification = () => {
    if (
      keyRef?.current?.value.replace(/\s\s+/g, "") !== "" &&
      valueRef.current.value.replace(/\s\s+/g, "") !== ""
    ) {
      setSpecification([
        ...specification,
        { key: keyRef?.current?.value, value: valueRef.current.value },
      ]);

      keyRef.current.value = "";
      valueRef.current.value = "";
    }
  };

  // REACT FORM HOOKS
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //SUBMIL FUNCTION
  const onSubmit = async (data) => {
    setLoading(true);

    // IMAGE UPLOADS
    let image = "";
    let imgData = new FormData();
    imgData.append("image", data.img[0]);
    await axios
      .post(`https://api.imgbb.com/1/upload?key=${API}`, imgData)
      .then((res) => {
        if (res.data.status === 200) {
          image = res.data.data.display_url;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // IMAGE UPLOADS
    let len = data.gallary_img.length;
    let imageArray = [];
    for (let i = 0; i < len; ++i) {
      let formData1 = new FormData();
      formData1.append("image", data.gallary_img[i]);
      await axios
        .post(`https://api.imgbb.com/1/upload?key=${API}`, formData1)
        .then((res) => {
          // console.log(res.data.data.display_url);
          if (res.data.status === 200) {
            imageArray.push(res.data.data.display_url);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // ASSEMBLING ALL DATA
    if (image !== "") data.img = image;
    else data.img = "";
    if (imageArray.length !== 0) data.gallary_img = imageArray;
    else data.gallary_img = [];
    if (specification.length !== 0) data.specification = specification;
    else data.specification = [];

    // console.log(data);

    //SENDING DATA TO MONGO-DB DATABASE
    await axiosInstance.post("product/create", data).then((res) => {
      setLoading(false);
      if (res.status === 201) {
        Swal.fire(
          "Saved!",
          `You have successfully added the Item.`,
          "success"
        ).then(() => {
          resetField("title");
          resetField("unit_price");
          resetField("mcq");
          resetField("stock");
          resetField("description");
          resetField("img");
          resetField("gallary_img");
          setSpecification([]);
        });
      } else {
        Swal.fire("Error!", `Something went wrong`, "error");
      }
      // console.log(res.data);
    });

    // setLoading(false);
  };

  if (loading === true) Swal.showLoading();

  return (
    <div className="w-full py-6 lg:px-10 md:px-10 sm:px-2 ">
      <p className="text-sm font-bold">Add a product</p>

      <form className="mt-4 text-xs" onSubmit={handleSubmit(onSubmit)}>
        {/* Name unit_price discount */}
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4">
          <div className="form-control w-full ">
            <label className="label">
              <span className="">Title</span>
            </label>
            <input
              type="text"
              name="title"
              className="input input-bordered text-xs rounded-none w-full "
              {...register("title", {
                required: true,
                message: "This field is required",
              })}
            />
            {errors.title && (
              <label className="label">
                <span className="-alt text-sm text-red-500">
                  This field is required
                </span>
              </label>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="">Unit price</span>
            </label>
            <input
              type="number"
              name="unit_price"
              className="input input-bordered text-xs rounded-none w-full "
              {...register("unit_price", {
                required: true,
                message: "This field is required",
              })}
            />
            {errors.unit_price && (
              <label className="label">
                <span className="-alt text-sm text-red-500">
                  This field is required
                </span>
              </label>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="">MCQ</span>
            </label>
            <input
              type="number"
              name="mcq"
              className="input input-bordered text-xs rounded-none w-full "
              {...register("mcq", {
                required: true,
                message: "This field is required",
              })}
            />
            {errors.mcq && (
              <label className="label">
                <span className="-alt text-sm text-red-500">
                  This field is required
                </span>
              </label>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="">Stock</span>
            </label>
            <input
              type="number"
              name="stock"
              className="input input-bordered text-xs rounded-none w-full "
              {...register("stock", {
                required: true,
                message: "This field is required",
              })}
            />
            {errors.stock && (
              <label className="label">
                <span className="-alt text-sm text-red-500">
                  This field is required
                </span>
              </label>
            )}
          </div>
        </div>

        {/* IMAGES  */}
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5">
          <div className="form-control w-full ">
            <label className="label">
              <span className="">Image</span>
            </label>
            <input
              type="file"
              name="img"
              className="input input-bordered text-xs rounded-none w-full "
              {...register("img", { required: true })}
            />
            {errors.img && (
              <label className="label">
                <span className="-alt text-sm text-red-500">
                  This field is required
                </span>
              </label>
            )}
          </div>

          <div className="form-control w-full ">
            <label className="label">
              <span className="">All Image</span>
            </label>
            <input
              multiple
              type="file"
              name="gallary_img"
              className="input input-bordered text-xs rounded-none w-full "
              {...register("gallary_img")}
            />
          </div>
        </div>
        {/* specifiation */}
        <div className="text-xs">
          <p className="mt-4 mb-2">Add Specification</p>
          <div className="grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-5 w-full">
            <input
              ref={keyRef}
              type="text"
              placeholder="Key"
              className="input input-bordered rounded-none text-xs w-full "
            />
            <input
              ref={valueRef}
              type="text"
              placeholder="Value"
              className="input input-bordered rounded-none text-xs  w-full"
            />
            <p
              onClick={handleSpecification}
              className="btn btn-outline w-full rounded-none"
            >
              add
            </p>
          </div>
          <div className="p-4 bg-slate-100 mt-4 text-black rounded-lg">
            <p className="mb-2 font-semibold">Specification</p>
            <div className="">
              <div className="grid grid-cols-2 font-bold ">
                <p className="border border-gray-400 p-1">Key</p>
                <p className="border border-gray-400 p-1">Value</p>
              </div>
              {specification?.map((x, index) => {
                return (
                  <div key={index} className="grid grid-cols-2">
                    <p className=" p-1 border border-gray-400">{x?.key}</p>
                    <p className=" p-1 border border-gray-400">{x?.value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* description */}
        <div className="grid grid-cols-1 gap-5">
          <div className="form-control w-full ">
            <label className="label">
              <span className="">Description</span>
            </label>
            <textarea
              type="text"
              name="title"
              className="textarea textarea-bordered rounded-none text-xs h-24"
              {...register("description", {
                required: true,
              })}
            />
            {errors.description && (
              <label className="label">
                <span className="-alt text-sm text-red-500">
                  This field is required
                </span>
              </label>
            )}
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <input
            type="submit"
            value="Upload Product"
            className="btn btn-success btn-wide rounded-none mt-8"
          ></input>
        </div>
      </form>
      {/* submit  */}
    </div>
  );
};

export default AddAProduct;
