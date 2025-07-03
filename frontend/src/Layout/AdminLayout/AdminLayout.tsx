import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
export default function AdminLayout() {
  return (
    <div className="flex">
      <div className="">
        <Sidebar />
      </div>
      {/* <div className="flex-none"> */}
      <Outlet />
      {/* </div> */}
    </div>
  );
}
