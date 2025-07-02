import React from "react";
import { CodeIcon } from "lucide-react";
export default function Sidebar() {
  return (
    <div className="">
      <div className="flex items-center gap-2 p-4 border-b border-gray-200">
        <CodeIcon
          size={30}
          className="bg-primary p-[5px] rounded-md text-white animate-logo"
        />
        <div>
          <h2>CodeForge</h2>
          <p>Admin Dashboard</p>
        </div>
      </div>
      <div></div>
    </div>
  );
}
