import React, { useState } from "react";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import ErrorPage from "../../shared/ErrorPage";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import UpdateCategoryModal from "../Modals/UpdateCategoryModal";

const ManageCategory = () => {
  const [changes, increaseChanges] = useState(0);
  const [updateData, setUpdateData] = useState({});
  const {
    isLoading,
    isError,
    data: category,
    error,
  } = useQuery(["categorys", changes], async ({ changes }) => {
    // console.log(changes);
    let data = await axiosInstance.get("category/get");
    Swal.close();
    return data;
  });

  if (isError) return <ErrorPage msg={error}></ErrorPage>;

  const handleDeleteCategory = (_id) => {
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
        axiosInstance.delete(`category/delete?_id=${_id}`).then((res) => {
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

  if (isLoading) Swal.showLoading();

  return (
    <div className="py-6 lg:px-10 md:px-10 sm:px-2  w-full">
      <p className="text-sm font-semibold ">Manage Category</p>
      {/* purchase categorys */}
      <div className="overflow-auto   rounded mt-4">
        <table className="border-collaspe text-xs border border-gray-300 w-full ">
          <thead>
            <tr>
              <th className="p-2 border border-gray-300 ">Category Title</th>
              <th className="p-2 border border-gray-300 ">Category Code</th>
              <th className="p-2 border border-gray-300 ">Category _id</th>
              <th className="p-2 border border-gray-300 ">Update</th>
              <th className="p-2 border border-gray-300 ">Delete</th>
            </tr>
          </thead>
          <tbody>
            {category?.data?.map((x, index) => {
              return (
                <tr key={index}>
                  {/* category discription */}

                  <td className="p-2 border border-gray-300 ">
                    {x?.categoryTitle}
                  </td>
                  <td align="center" className="p-2 border border-gray-300">
                    {x?.categoryCode}
                  </td>

                  <td align="center" className="p-2 border border-gray-300">
                    {x?._id}
                  </td>
                  {/* BTNS FROM HERE */}

                  {/* UPDATE */}
                  <td
                    align="center"
                    className="p-2 border  border-gray-300 mx-auto content-center"
                  >
                    <label
                      htmlFor="update-category-modal"
                      className="btn btn-xs bg-warning border-none text-white"
                      onClick={() => {
                        setUpdateData(x);
                      }}
                    >
                      Update
                    </label>
                  </td>
                  {/* delete */}
                  <td
                    align="center"
                    className="p-2 border border-gray-300 mx-auto content-center text-white"
                  >
                    <button
                      className="btn btn-xs bg-red-500 border-none "
                      onClick={() => handleDeleteCategory(x?._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Update Modal Here */}
      <UpdateCategoryModal props={updateData}></UpdateCategoryModal>
    </div>
  );
};

export default ManageCategory;
