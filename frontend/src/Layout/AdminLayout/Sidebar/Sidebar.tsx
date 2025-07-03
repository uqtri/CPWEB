import React from "react";
import {
  ChartBar,
  CodeIcon,
  FileText,
  Settings,
  Trophy,
  Type,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
const SidebarLinks = [
  { name: "Trang chủ", path: "/admin/dashboard", icon: ChartBar },
  { name: "Các bài tập", path: "/admin/problem", icon: FileText },
  { name: "Người dùng", path: "/admin/user", icon: Users },
  { name: "Kì thi", path: "/admin/contest", icon: Trophy },
  { name: "Dạng bài tập", path: "/admin/category", icon: Type },
  { name: "Cài đặt", path: "/admin/settings", icon: Settings },
];
export default function Sidebar() {
  return (
    <div className="min-h-[100vh] border-r border-gray-200">
      <div className="flex items-center gap-2 p-4 border-b border-r border-gray-200">
        <CodeIcon
          size={30}
          className="bg-primary p-[5px] rounded-md text-white animate-logo"
        />
        <div>
          <h1 className="text-primary font-bold text-2xl">CodeForge</h1>
          <p className="">Trang admin</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        {SidebarLinks.map((link) => {
          return (
            <Link
              to={link.path}
              id={link.name}
              className="flex gap-4 hover:bg-gray-200 pl-4 pr-6 py-4"
            >
              <link.icon size={35} />
              <p className="text-2xl text-nowrap"> {link.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
