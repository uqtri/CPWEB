import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../../Layout/MainLayout/MainLayout";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import Home from "../../pages/Home/Home";
// import ProblemDetail from "../../pages/ProblemDetail/ProblemDetail";
import ProblemDetail from "@/components/ProblemDetail/ProblemDetail";
import Submit from "../../pages/Submit/Submit";
import Profile from "../../pages/Profile/Profile";
import SubmissionDetail from "../../pages/SubmissionDetail/SubmissionDetail";
import Problemset from "../../pages/Problemset/Problemset";
import AdminLayout from "../../Layout/AdminLayout/AdminLayout";
import Dashboard from "../../pages/admin/Dashboard/Dashboard";
import Problem from "../../pages/admin/Problem/Problem";
import AdminSubmission from "../../pages/admin/Submission/Submission";
import Submission from "@/pages/Submission/Submission";
import Post from "../../pages/admin/Post/Post";
import Settings from "../../pages/admin/Settings/Settings";
import User from "../../pages/admin/User/User";
import Category from "@/pages/admin/Category/Category";
import TestCase from "@/pages/admin/TestCase/TestCase";
import TestCaseDetail from "@/pages/admin/TestCase/partials/TestCaseDetail/TestCaseDetail";
import Leaderboard from "@/pages/Leaderboard/Leaderboard";
import AdminContest from "@/pages/admin/Contest/Contest";
import Contest from "@/pages/Contest/Contest";
import ContestDetail from "@/pages/ContestDetail/ContestDetail";
import ContestProblemDetail from "@/pages/Contest/Partials/ProblemDetail/ProblemDetail";
import Chat from "@/pages/Chat/Chat";
import Message from "@/pages/Message/Message";
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
        path: "/problem/:problemSlug",
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
      { path: "/problem/:problemSlug/submit", element: <Submit /> },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/profile/:userId",
        element: <Profile />,
      },
      {
        path: "submission/:submissionId",
        element: <SubmissionDetail />,
      },
      {
        path: "problemset",
        element: <Problemset />,
      },
      {
        path: "/leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "/contests",
        element: <Contest />,
      },
      {
        path: "/contest/:contestSlug",
        element: <ContestDetail />,
      },
      {
        path: "/contest/:contestSlug/problem/:problemSlug",
        element: <ContestProblemDetail />,
      },
      {
        path: "/chat/",
        element: <Chat />,
        children: [
          {
            path: "/chat/:conversationId",
            element: <Message />,
          },
        ],
      },
      {
        path: "/submissions",
        element: <Submission />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      { path: "/admin/user", element: <User /> },

      {
        path: "/admin/problem",
        element: <Problem />,
      },
      {
        path: "/admin/submission",
        element: <AdminSubmission />,
      },
      {
        path: "/admin/post",
        element: <Post />,
      },
      {
        path: "/admin/contest",
        element: <AdminContest />,
      },
      {
        path: "/admin/comment",
        element: <div>Admin Comment Section</div>,
      },
      {
        path: "/admin/settings",
        element: <Settings />,
      },
      { path: "/admin/category", element: <Category /> },
      { path: "/admin/test-case", element: <TestCase /> },
      { path: "/admin/test-case/:problemSlug", element: <TestCaseDetail /> },
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
