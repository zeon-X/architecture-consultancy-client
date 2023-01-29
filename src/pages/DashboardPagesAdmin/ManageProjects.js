import React, { useState } from "react";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import ErrorPage from "../../shared/ErrorPage";
import axiosInstance from "../../utilities/axiosInstance/axiosInstance";
import UpdateProjectModal from "../Modals/UpdateProjectModal";

const ManageProjects = () => {
  const [changes, increaseChanges] = useState(0);

  const [updateData, setUpdateData] = useState({});
  const {
    isLoading,
    isError,
    data: project,
    error,
  } = useQuery(["projectsadmin", changes], async ({ changes }) => {
    let data = await axiosInstance.get("project/get");
    Swal.close();
    return data;
  });

  if (isError) return <ErrorPage msg={error}></ErrorPage>;

  const handleProjectStatus = async (_id, status) => {
    let updatedStatus = status === "active" ? "deactive" : "active";
    await axiosInstance
      .put(`project/update-status?_id=${_id}&status=${updatedStatus}`)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          Swal.fire(
            "Status Updated!",
            "Your project status has been updated",
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
  };

  const handleDeleteProject = (_id) => {
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
        axiosInstance.delete(`project/delete?_id=${_id}`).then((res) => {
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
  // console.log(project);
  if (isLoading) {
    Swal.showLoading();
  }

  return (
    <div className="py-6 lg:px-10 md:px-10 sm:px-2  w-full">
      <p className="text-sm font-semibold ">Manage Projects</p>
      {/* purchase projects */}
      <div className="overflow-auto   rounded mt-4">
        <table className="border-collaspe text-xs border border-gray-300 w-full ">
          <thead>
            <tr>
              <th className="p-2 border border-gray-300 ">Image</th>
              <th className="p-2 border border-gray-300 ">Title</th>
              <th className="p-2 border border-gray-300 ">Category</th>
              <th className="p-2 border border-gray-300 ">Client</th>
              <th className="p-2 border border-gray-300 ">Location</th>
              <th className="p-2 border border-gray-300 ">Project Year</th>
              <th className="p-2 border border-gray-300 ">Status</th>
              <th className="p-2 border border-gray-300 ">Update</th>
              <th className="p-2 border border-gray-300 ">Delete</th>
              <th className="p-2 border border-gray-300 ">Details</th>
            </tr>
          </thead>
          <tbody>
            {project?.data?.map((x, index) => {
              return (
                <tr key={index}>
                  {/* project discription */}
                  <td align="center" className="p-1 border border-gray-300">
                    <img className=" w-16 h-16" src={x?.img} alt="" />
                  </td>
                  <td className="p-2 border border-gray-300 ">{x?.title}</td>
                  <td align="center" className="p-2 border border-gray-300">
                    {x?.category?.categoryTitle}
                  </td>
                  <td align="center" className="p-2 border border-gray-300">
                    {x?.client}
                  </td>
                  <td align="center" className="p-2 border border-gray-300">
                    {x?.location}
                  </td>
                  <td align="center" className="p-2 border border-gray-300">
                    {x?.projectYear}
                  </td>
                  {/* <td align="center" className="p-2 border border-gray-300">
                    {x?.status}
                  </td> */}
                  {/* BTNS FROM HERE */}

                  {/* status */}
                  <td
                    align="center"
                    className="p-2 border  border-gray-300 mx-auto content-center"
                  >
                    <input
                      type="checkbox"
                      className="toggle"
                      checked={x?.status === "active" ? true : false}
                      onClick={() => handleProjectStatus(x?._id, x?.status)}
                    />
                  </td>
                  {/* update */}
                  <td
                    align="center"
                    className="p-2 border  border-gray-300 mx-auto content-center"
                  >
                    <label
                      htmlFor="update-project-modal"
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
                      onClick={() => handleDeleteProject(x?._id)}
                    >
                      Delete
                    </button>
                  </td>
                  {/* details */}
                  <td
                    align="center"
                    className=" p-2 border  border-gray-300 mx-auto content-center"
                  >
                    <button className="btn btn-xs bg-success border-none text-white">
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
      <UpdateProjectModal
        props={updateData}
        increaseChanges={increaseChanges}
        changes={changes}
      ></UpdateProjectModal>
    </div>
  );
};

export default ManageProjects;
