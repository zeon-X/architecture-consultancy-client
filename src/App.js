import "./App.css";
import { Route, Routes } from "react-router-dom";
import Drawer from "./components/Drawer";
import Home from "./pages/Home/Home";
import Login from "./pages/LoginRegister/Login";
import Register from "./pages/LoginRegister/Register";
import RequireAuth from "./utilities/RequireAuth/RequireAuth";
import DashboardDrawer from "./components/DashboardDrawer";
import MyProfile from "./pages/DashboardPagesShared/MyProfile";
import ManageAllOrders from "./pages/DashboardPagesAdmin/ManageAllOrders";
import RequireAuthAndAdmin from "./utilities/RequireAuth/RequireAuthAndAdmin";
import ManageProjects from "./pages/DashboardPagesAdmin/ManageProjects";
import MakeAdmin from "./pages/DashboardPagesAdmin/MakeAdmin";
import AddAProject from "./pages/DashboardPagesAdmin/AddAProject";
import MyOrders from "./pages/DashBoardPagesUser/MyOrders";
import AddReview from "./pages/DashBoardPagesUser/AddReview";
import EditMyProfile from "./pages/DashboardPagesShared/EditMyProfile";
import NotFound from "./shared/NotFound";
import AddCategory from "./pages/DashboardPagesAdmin/AddCategory";
import ManageCategory from "./pages/DashboardPagesAdmin/ManageCategory";
import AddCustomReview from "./pages/DashboardPagesAdmin/AddCustomReview";
import ManageReview from "./pages/DashboardPagesAdmin/ManageReview";
import ViewAllProjects from "./pages/ViewAllProject/ViewAllProject";
import LoginModal from "./pages/Modals/LoginModal";
import RegisterModal from "./pages/Modals/RegisterModal";

function App() {
  return (
    <div className="relative">
      {/*  ------ MODALS HERE START ----  */}
      <LoginModal></LoginModal>
      <RegisterModal></RegisterModal>
      {/*  ------ MODALS HERE END ------  */}

      {/* ------ PAGES START --------- */}
      <Routes>
        <Route
          path="*"
          element={
            <Drawer>
              <NotFound></NotFound>
            </Drawer>
          }
        ></Route>
        <Route
          path="/"
          element={
            <Drawer>
              <Home></Home>
            </Drawer>
          }
        ></Route>
        <Route
          path="/view-all-works"
          element={
            <Drawer>
              <ViewAllProjects></ViewAllProjects>
            </Drawer>
          }
        ></Route>
        {/* ------ PAGES END --------- */}

        {/* -------- USER DB START --------- */}
        <Route
          path="/my-orders"
          element={
            <Drawer>
              <RequireAuth>
                <MyOrders></MyOrders>
              </RequireAuth>
            </Drawer>
          }
        ></Route>
        <Route
          path="/my-reviews"
          element={
            <Drawer>
              <RequireAuth>
                <AddReview></AddReview>
              </RequireAuth>
            </Drawer>
          }
        ></Route>
        {/* -------- USER DB END --------- */}

        {/* -------- ADMIN DB WITH PANEL START--------- */}
        <Route
          path="/dashboard-admin"
          element={
            <Drawer>
              <RequireAuthAndAdmin>
                <DashboardDrawer></DashboardDrawer>
              </RequireAuthAndAdmin>
            </Drawer>
          }
        >
          <Route index element={<ManageAllOrders></ManageAllOrders>}></Route>
          {/* <Route path="my-account" element={<MyProfile></MyProfile>}></Route>
          <Route
            path="my-account-update"
            element={<EditMyProfile></EditMyProfile>}
          ></Route> */}

          <Route
            path="manage-orders"
            element={<ManageAllOrders></ManageAllOrders>}
          ></Route>
          <Route
            path="manage-add-category"
            element={<AddCategory></AddCategory>}
          ></Route>
          <Route
            path="manage-category"
            element={<ManageCategory></ManageCategory>}
          ></Route>
          <Route
            path="manage-add-project"
            element={<AddAProject></AddAProject>}
          ></Route>
          <Route
            path="manage-projects"
            element={<ManageProjects></ManageProjects>}
          ></Route>
          <Route
            path="manage-add-custom-review"
            element={<AddCustomReview></AddCustomReview>}
          ></Route>
          <Route
            path="manage-review"
            element={<ManageReview></ManageReview>}
          ></Route>
          {/* <Route path="manage-admin" element={<MakeAdmin></MakeAdmin>}></Route> */}
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Route>
        {/* -------- ADMIN DB WITH PANEL END --------- */}
      </Routes>
    </div>
  );
}

export default App;
