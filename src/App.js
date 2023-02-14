import "./App.css";
import { Route, Routes } from "react-router-dom";
import Drawer from "./components/Drawer";
import Home from "./pages/Home/Home";
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
import ViewAllProjects from "./pages/Project/ViewAllProject";
import LoginModal from "./pages/Modals/LoginModal";
import RegisterModal from "./pages/Modals/RegisterModal";
import PricingPlan from "./pages/PricingPlan/PricingPlan";
import AddABlog from "./pages/DashboardPagesAdmin/AddABlog";
import ManageBlogs from "./pages/DashboardPagesAdmin/ManageBlogs";
import Blog from "./pages/Blog/Blog";
import BlogDetails from "./pages/Blog/BlogDetails";
import ProjectDetails from "./pages/Project/ProjectDetails";
import PlaceOrder from "./pages/PricingPlan/PlaceOrder";
import LoginPage from "./pages/LoginRegister/LoginPage";
import RegisterPage from "./pages/LoginRegister/RegisterPage";
import ManageOrderDetails from "./pages/DashboardPagesAdmin/ManageOrderDetails";
import ManageHeroProjects from "./pages/DashboardPagesAdmin/ManageHeroProjects";
import AddServiceCategory from "./pages/DashboardPagesAdmin/AddServiceCategory";
import ManageServiceCategory from "./pages/DashboardPagesAdmin/ManageServiceCategory";

function App() {
  return (
    <div className="relative">
      {/*  ------ MODALS HERE START ----  */}
      <LoginModal></LoginModal>
      <RegisterModal></RegisterModal>

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
          path="/login"
          element={
            <Drawer>
              <LoginPage></LoginPage>
            </Drawer>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <Drawer>
              <RegisterPage></RegisterPage>
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
        {/*------------ PROJECT DETAILS------------- */}
        <Route
          path="/all-projects"
          element={
            <Drawer>
              <ViewAllProjects></ViewAllProjects>
            </Drawer>
          }
        ></Route>
        <Route
          path="/project-details/:_id/:catId"
          element={
            <Drawer>
              <ProjectDetails></ProjectDetails>
            </Drawer>
          }
        ></Route>
        {/* -------------- BLOG ----------------*/}
        <Route
          path="/blogs"
          element={
            <Drawer>
              <Blog></Blog>
            </Drawer>
          }
        ></Route>
        <Route
          path="/blog-details/:_id"
          element={
            <Drawer>
              <BlogDetails></BlogDetails>
            </Drawer>
          }
        ></Route>
        {/*----------------- PRICING AND ORDER------------------ */}
        <Route
          path="/pricing"
          element={
            <Drawer>
              <PricingPlan></PricingPlan>
            </Drawer>
          }
        ></Route>
        {/*-- USER DB START --*/}
        {/* ------ ORDER --------- */}
        <Route
          path="/order/:type"
          element={
            <Drawer>
              <RequireAuth>
                <PlaceOrder></PlaceOrder>
              </RequireAuth>
            </Drawer>
          }
        ></Route>

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
        {/* REVIEW */}
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
            // <Drawer>
            <RequireAuthAndAdmin>
              <DashboardDrawer></DashboardDrawer>
            </RequireAuthAndAdmin>
            // </Drawer>
          }
        >
          <Route index element={<ManageAllOrders></ManageAllOrders>}></Route>
          {/* 
          <Route path="my-account" element={<MyProfile></MyProfile>}></Route>
          <Route
            path="my-account-update"
            element={<EditMyProfile></EditMyProfile>}
          ></Route> 
          */}

          <Route
            path="manage-hero"
            element={<ManageHeroProjects></ManageHeroProjects>}
          ></Route>
          <Route
            path="manage-orders"
            element={<ManageAllOrders></ManageAllOrders>}
          ></Route>
          <Route
            path="manage-order-details/:_id"
            element={<ManageOrderDetails></ManageOrderDetails>}
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

          <Route path="manage-add-blog" element={<AddABlog></AddABlog>}></Route>
          <Route
            path="manage-blog"
            element={<ManageBlogs></ManageBlogs>}
          ></Route>

          <Route
            path="manage-add-servicecategory"
            element={<AddServiceCategory></AddServiceCategory>}
          ></Route>
          <Route
            path="manage-servicecategory"
            element={<ManageServiceCategory></ManageServiceCategory>}
          ></Route>

          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Route>
        {/* -------- ADMIN DB WITH PANEL END --------- */}
      </Routes>
    </div>
  );
}

export default App;
