import Sidebar from "./Partials/Sidebar/Sidebar";

import { Outlet } from "react-router-dom";
export default function Chat() {
  return (
    <div className="flex gap-4 h-[65vh] md:h-[60vh] lg:h-[80vh] overflow-y-auto">
      <Sidebar />
      <Outlet />
    </div>
  );
}
