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
import ManageProducts from "./pages/DashboardPagesAdmin/ManageProducts";
import MakeAdmin from "./pages/DashboardPagesAdmin/MakeAdmin";
import AddAProduct from "./pages/DashboardPagesAdmin/AddAProduct";
import MyWishlist from "./pages/DashBoardPagesUser/MyWishlist";
import MyOrders from "./pages/DashBoardPagesUser/MyOrders";
import AddReview from "./pages/DashBoardPagesUser/AddReview";
import EditMyProfile from "./pages/DashboardPagesShared/EditMyProfile";
import NotFound from "./shared/NotFound";

function App() {
  return (
    <div className="relative">
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
          path="/login"
          element={
            <Drawer>
              <Login></Login>
            </Drawer>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <Drawer>
              <Register></Register>
            </Drawer>
          }
        ></Route>

        <Route
          path="/dashboard"
          element={
            <Drawer>
              <RequireAuth>
                <DashboardDrawer></DashboardDrawer>
              </RequireAuth>
            </Drawer>
          }
        >
          {/* shared */}
          <Route index element={<MyProfile></MyProfile>}></Route>
          <Route path="my-account" element={<MyProfile></MyProfile>}></Route>
          <Route
            path="my-account-update"
            element={<EditMyProfile></EditMyProfile>}
          ></Route>
          {/* user */}
          <Route path="my-wishlist" element={<MyWishlist></MyWishlist>}></Route>
          <Route path="my-orders" element={<MyOrders></MyOrders>}></Route>
          <Route path="my-reviews" element={<AddReview></AddReview>}></Route>
          {/* admin  */}
          <Route
            path="manage-orders"
            element={
              <RequireAuthAndAdmin>
                <ManageAllOrders></ManageAllOrders>
              </RequireAuthAndAdmin>
            }
          ></Route>
          <Route
            path="manage-add-product"
            element={
              <RequireAuthAndAdmin>
                <AddAProduct></AddAProduct>
              </RequireAuthAndAdmin>
            }
          ></Route>
          <Route
            path="manage-products"
            element={
              <RequireAuthAndAdmin>
                <ManageProducts></ManageProducts>
              </RequireAuthAndAdmin>
            }
          ></Route>
          <Route
            path="manage-admin"
            element={
              <RequireAuthAndAdmin>
                <MakeAdmin></MakeAdmin>
              </RequireAuthAndAdmin>
            }
          ></Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
