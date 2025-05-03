import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../../Layout/MainLayout/MainLayout";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import Home from "../../pages/Home/Home";
import ProblemDetail from "../../pages/ProblemDetail/ProblemDetail";
import Submit from "../../pages/Submit/Submit";
import Profile from "../../pages/Profile/Profile";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        element: <Home />,
        path: "/",
      },
      {
        path: "/problem/:problemId",
        element: <ProblemDetail />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      { path: "/problem/:problemId/submit", element: <Submit /> },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  // {
  //   path: "/login",
  //   element: <Login />,
  // },
  // {
  //   path: "/register",
  //   element: <Register />,
  // },
  { path: "*", element: <div>404 Not Found</div> },
]);
export default function MainRoute() {
  return <RouterProvider router={router} />;
}
