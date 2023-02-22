import "./App.css";
import { Route, Routes } from "react-router-dom";
import Drawer from "./components/Drawer";
import Home from "./pages/Home/Home";
import RequireAuth from "./utilities/RequireAuth/RequireAuth";
import DashboardDrawer from "./components/DashboardDrawer";
import ManageAllOrders from "./pages/DashboardPagesAdmin/ManageAllOrders";
import RequireAuthAndAdmin from "./utilities/RequireAuth/RequireAuthAndAdmin";
import ManageProjects from "./pages/DashboardPagesAdmin/ManageProjects";
import AddAProject from "./pages/DashboardPagesAdmin/AddAProject";
import MyOrders from "./pages/DashBoardPagesUser/MyOrders";
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
import AddArticle from "./pages/DashboardPagesAdmin/AddArticle";
import ManageArticle from "./pages/DashboardPagesAdmin/ManageArticle";
import ArticleDetails from "./pages/Service/ArticleDetails";
import ManageCPC from "./pages/DashboardPagesAdmin/ManageCPC";
import SeeAllService from "./pages/Service/SeeAllService";

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

        {/* -------------- SERVICE ----------------*/}
        <Route
          path="/all-services"
          element={
            <Drawer>
              <SeeAllService></SeeAllService>
            </Drawer>
          }
        ></Route>
        <Route
          path="/article-details/:_id"
          element={
            <Drawer>
              <ArticleDetails></ArticleDetails>
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

          <Route
            path="manage-add-article"
            element={<AddArticle></AddArticle>}
          ></Route>
          <Route
            path="manage-article"
            element={<ManageArticle></ManageArticle>}
          ></Route>

          <Route
            path="manage-client-page-component-wwa"
            element={<ManageCPC></ManageCPC>}
          ></Route>

          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Route>
        {/* -------- ADMIN DB WITH PANEL END --------- */}
      </Routes>

      {/* <div className="absolute right-10 bottom-40  transform   text-white">
        <div className="flex flex-col gap-4 justify-center items-center box p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
      </div> */}
    </div>
  );
}

export default App;
