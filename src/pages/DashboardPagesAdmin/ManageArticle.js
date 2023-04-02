import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ErrorPage from "../../shared/ErrorPage";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import UpdateArticleModal from "../Modals/UpdateArticleModal";

const ManageArticle = () => {
  const [changes, increaseChanges] = useState(0);
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useState({});
  const {
    isLoading,
    isError,
    data: article,
    error,
  } = useQuery(["articlesadmin", changes], async ({ changes }) => {
    let data = await axiosInstance.get("article/get");
    Swal.close();
    return data;
  });

  // console.log(article);

  if (isError) return <ErrorPage msg={error}></ErrorPage>;

  const handleDeleteArticle = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.delete(`article/delete?_id=${_id}`).then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            Swal.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            ).then(() => {
              increaseChanges(changes + 1);
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: res.response.data.message || res.response.data,
            });
          }
        });
      }
    });
  };
  // console.log(article);
  if (isLoading) {
    Swal.showLoading();
  }

  return (
    <div className="py-6 lg:px-10 md:px-10 sm:px-2  w-full">
      <p className="text-sm font-semibold ">Manage Articles</p>
      {/* purchase articles */}
      <div className="overflow-auto   rounded mt-4">
        <table className="border-collaspe text-xs border border-gray-300 w-full ">
          <thead>
            <tr>
              <th className="p-2 border border-gray-300 ">Image</th>
              <th className="p-2 border border-gray-300 max-w-[280px]">
                Title
              </th>
              <th className="p-2 border border-gray-300 ">Slug</th>
              {/* <th className="p-2 border border-gray-300 ">Updation Date</th> */}
              <th className="p-2 border border-gray-300 ">Delete</th>
              <th className="p-2 border border-gray-300 ">Update</th>
              <th className="p-2 border border-gray-300 ">Details</th>
            </tr>
          </thead>
          <tbody>
            {article?.data?.map((x, index) => {
              return (
                <tr key={index}>
                  {/* article discription */}
                  <td align="center" className="p-1 border border-gray-300">
                    <img
                      className=" w-16 h-16"
                      src={x?.articlePara[0]?.img}
                      alt=""
                    />
                  </td>
                  <td align="center" className="p-2 border border-gray-300 ">
                    {x?.articleTitle}
                  </td>
                  <td align="center" className="p-2 border border-gray-300 ">
                    {x?.slug}
                  </td>
                  {/* <td align="center" className="p-2 border border-gray-300">
                    {x?.updatedAt}
                  </td> */}

                  {/* BTNS FROM HERE */}

                  {/* delete */}
                  <td
                    align="center"
                    className="p-2 border border-gray-300 mx-auto content-center text-white"
                  >
                    <button
                      className="btn btn-xs bg-red-500 border-none "
                      onClick={() => handleDeleteArticle(x?._id)}
                    >
                      Delete
                    </button>
                  </td>
                  {/* update */}
                  <td
                    align="center"
                    className="p-2 border  border-gray-300 mx-auto content-center"
                  >
                    <label
                      htmlFor="update-article-modal"
                      className="btn btn-xs bg-warning border-none text-white"
                      onClick={() => {
                        setUpdateData(x);
                      }}
                    >
                      Update
                    </label>
                  </td>
                  {/* details */}
                  <td
                    align="center"
                    className=" p-2 border  border-gray-300 mx-auto content-center"
                  >
                    <button
                      onClick={() => {
                        navigate(`/services/${x?.slug}`);
                      }}
                      className="btn btn-xs bg-success border-none text-white"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Update Modal Here */}
      <UpdateArticleModal
        props={updateData}
        increaseChanges={increaseChanges}
        changes={changes}
      ></UpdateArticleModal>
    </div>
  );
};

export default ManageArticle;
