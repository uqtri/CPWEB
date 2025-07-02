import React from "react";
import { Outlet } from "react-router-dom";
export default function AdminLayout() {
  return (
    <div className="flex">
      <div className=""></div>
      <Outlet />
    </div>
  );
}
