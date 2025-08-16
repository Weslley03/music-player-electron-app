import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import ViewCardSelected from "../pages/ViewCardSelected/ViewCardSelected";
import GenericLayout from "../layouts/GenericLayout";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../pages/Login/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        element: <GenericLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "/view-card-selected/:type/:id", element: <ViewCardSelected /> },
        ],
      },
    ],
  },
  { path: "/login", element: <LoginPage /> },
]);