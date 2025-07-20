import Sidebar from "./Partials/Sidebar/Sidebar";

import { Outlet } from "react-router-dom";
export default function Chat() {
  return (
    <div className="flex gap-4 h-[85vh] overflow-y-auto">
      <Sidebar />
      {/* <Message /> */}
      <Outlet />
    </div>
  );
}
