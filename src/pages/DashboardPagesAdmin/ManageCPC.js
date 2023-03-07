import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import { useForm } from "react-hook-form";

const ManageCPC = () => {
  const [changes, increaseChanges] = useState(0);
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useState({});
  const {
    isLoading,
    isError,
    data: cpc,
    error,
  } = useQuery(["cpcadmin", changes], async ({ changes }) => {
    let data = await axiosInstance.get("cpc/get");
    Swal.close();
    return data?.data[0];
  });

  // REACT FORM HOOKS
  const {
    register,
    resetField,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return cpc?.whoWeAreSection;
    }, [cpc]),
  });

  useEffect(() => {
    reset(cpc?.whoWeAreSection);
  }, [cpc]);

  //SUBMIL FUNCTION
  const onSubmit = async (data) => {
    Swal.showLoading();

    // IMAGE UPLOADS  ----- SINGLE IMG 1
    let len = data?.img1?.length;
    let image = "";
    if (typeof data?.img1 !== typeof image) {
      let formData1 = new FormData();
      formData1.append("file", data?.img1[0]);
      await axiosInstance
        .post("/file/upload", formData1)
        .then((res) => {
          //console.log(res);
          if (res.status === 200) {
            image = res?.data?.url;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // ASSEMBLING DATA 1
    if (image !== "") data.img1 = image;
    else data.img1 = cpc?.whoWeAreSection?.img1;

    // IMAGE UPLOADS  ----- SINGLE IMG2
    len = data?.img2?.length;
    image = "";

    if (typeof data?.img2 !== typeof image) {
      let formData1 = new FormData();
      formData1.append("file", data?.img2[0]);
      await axiosInstance
        .post("/file/upload", formData1)
        .then((res) => {
          //console.log(res);
          if (res.status === 200) {
            image = res?.data?.url;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // ASSEMBLING DATA 2
    if (image !== "") data.img2 = image;
    else data.img2 = cpc?.whoWeAreSection?.img2;

    let tem = cpc;
    tem.whoWeAreSection = data;
    console.log(tem);

    // SENDING DATA TO MONGO-DB DATABASE
    await axiosInstance.put(`cpc/update?_id=${cpc._id}`, tem).then((res) => {
      if (res.status === 200) {
        Swal.close();
        Swal.fire(
          "Updated!",
          `You have successfully Updated Section2.`,
          "success"
        ).then(() => {
          increaseChanges(changes + 1);
        });
      } else {
        Swal.close();
        Swal.fire("Error!", `Something went wrong`, "error");
      }
      console.log(res);
    });
  };

  //   console.log(cpc);
  return (
    <div className="w-full mx-auto">
      <div className="w-full mx-auto">
        <div className="w-full mx-auto py-6 lg:px-10 md:px-10 sm:px-2 ">
          <p className="text-lg font-bold">Update Who We Are Section</p>

          <form className="mt-4 text-xs" onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              {/* Name btnText discount */}
              <div className=" grid lg:grid-cols-3 md:grid-cols-2  sm:grid-cols-1 gap-4">
                {/* sectionName  */}
                <div className=" form-control w-full ">
                  <label className="label">
                    <span className="">sectionName</span>
                  </label>
                  <input
                    type="text"
                    name="sectionName"
                    className="input input-bordered text-xs rounded w-full "
                    {...register("sectionName", {
                      required: false,
                      message: "This field is required",
                    })}
                  />
                </div>
                {/* sectionTitle  */}
                <div className=" form-control w-full ">
                  <label className="label">
                    <span className="">sectionTitle</span>
                  </label>
                  <input
                    type="text"
                    name="sectionTitle"
                    className="input input-bordered text-xs rounded w-full "
                    {...register("sectionTitle", {
                      required: false,
                      message: "This field is required",
                    })}
                  />
                </div>

                {/*btntxt */}
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="">btnText</span>
                  </label>
                  <input
                    type="text"
                    name="btnText"
                    className="input input-bordered text-xs rounded w-full "
                    {...register("btnText", {
                      required: false,
                      message: "This field is required",
                    })}
                  />
                </div>

                {/* img1 */}
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="">Image 1</span>
                  </label>
                  <input
                    type="file"
                    name="img1"
                    className="input input-bordered text-xs rounded w-full "
                    {...register("img1", { required: false })}
                  />
                  {errors.img1 && (
                    <label className="label">
                      <span className="-alt text-sm text-red-500">
                        This field is required
                      </span>
                    </label>
                  )}
                  <div className="my-4">
                    <p className="btn btn-xs mb-1">Current Image</p>
                    <p className="btn btn-xs bg-red-600 border-none text-white mx-2">
                      Select new image to update
                    </p>
                    <img
                      className="h-[300px] rounded-lg"
                      src={cpc?.whoWeAreSection?.img1}
                      alt="No picture"
                    />
                  </div>
                </div>
                {/* img2 */}
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="">Image 2</span>
                  </label>
                  <input
                    type="file"
                    name="img2"
                    className="input input-bordered text-xs rounded w-full "
                    {...register("img2", { required: false })}
                  />
                  {errors.img2 && (
                    <label className="label">
                      <span className="-alt text-sm text-red-500">
                        This field is required
                      </span>
                    </label>
                  )}
                  <div className="my-4">
                    <p className="btn btn-xs mb-1">Current Image</p>
                    <p className="btn btn-xs bg-red-600 border-none text-white mx-2">
                      Select new image to update
                    </p>
                    <img
                      className="h-[300px] rounded-lg"
                      src={cpc?.whoWeAreSection?.img2}
                      alt="No picture"
                    />
                  </div>
                </div>
              </div>
              {/* sectionAbout */}
              <div className="form-control">
                <label className="label">
                  <span className="">Section About</span>
                </label>
                <textarea
                  {...register("sectionAbout", {
                    required: true,
                  })}
                  className="textarea textarea-bordered h-24 text-xs rounded"
                  placeholder="Type Here"
                ></textarea>
                <label className="label">
                  {errors.sectionAbout && (
                    <span className="label-text-alt text-sm text-red-500">
                      This field is required
                    </span>
                  )}
                </label>
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              <input
                type="submit"
                value="Update Section2"
                className="btn btn-warning w-full max-w-xs rounded mt-10"
              ></input>
            </div>
          </form>
          {/* submit  */}
        </div>
      </div>
    </div>
  );
};

export default ManageCPC;
