import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import ViewCardSelected from "../pages/ViewCardSelected/ViewCardSelected";

export const router = createBrowserRouter([
  { path: '/', element: <HomePage />, },
  { path: '/view-card-selected/:id', element: <ViewCardSelected /> },
]);