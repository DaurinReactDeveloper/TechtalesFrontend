import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import UserProfile from "../pages/UserProfile";
import LoginUser from "../pages/LoginUser";
import LoginAdmin from "../pages/LoginAdmin";
import Register from "../pages/Register";
import AdminProfile from "../pages/AdminProfile";
import { PrivateRoute, PublicRoute } from "./PrivateRoute";
import Challenges from "../pages/Challenges";
import Stories from "../pages/Stories";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "login",
        element: <PublicRoute element={<LoginUser />} />,
      },
      {
        path: "loginAdmin",
        element: <PublicRoute element={<LoginAdmin />} />,
      },
      {
        path: "register",
        element: <PublicRoute element={<Register />} />,
      },
      {
        path: "challenges",
        element: <Challenges />,
      },
      {
        path: "stories",
        element: <Stories />,
      },
      {
        path: "user",
        element: <PrivateRoute element={<UserProfile />} requiredRole="user" />,
      },
      {
        path: "admin",
        element: (
          <PrivateRoute element={<AdminProfile />} requiredRole="admin" />
        ),
      },
    ],
  },
]);

export default router;
