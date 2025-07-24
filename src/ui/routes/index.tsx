import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import ViewCardSelected from "../pages/ViewCardSelected/ViewCardSelected";
import GenericLayout from "../layouts/GenericLayout";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <GenericLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/view-card-selected/:id', element: <ViewCardSelected /> },
    ],
  },
]);