import { Link, useNavigate } from "react-router-dom";
import { X, CodeIcon, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
const menuItems = [
  {
    name: "Trang chủ",
    link: "/",
  },
  {
    name: "Thử thách",
    link: "/problemset",
  },
  {
    name: "Cuộc thi",
    link: "/contests",
  },
  {
    name: "Bảng xếp hạng",
    link: "/leaderboard",
  },
  {
    name: "Nhắn tin",
    link: "/chat",
  },
  // {
  //   name: "Cộng đồng",
  //   link: "/community",
  // },
];
export default function HeaderForAnonymous() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tab, setTab] = useState("Trang chủ");
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center bg-white p-4 shadow-md">
        <Link to="/">
          <div className="flex items-center gap-4">
            <CodeIcon
              size={30}
              className="bg-primary p-[5px] rounded-md text-white animate-logo"
            />
            <p className="font-bold text-primary text-xl">CodeForge</p>
          </div>
        </Link>
        <div className="hidden lg:flex space-x-4 items-center">
          {menuItems.map((item) => {
            return (
              <p
                key={item.name}
                onClick={() => {
                  setIsMenuOpen(false);
                  setTab(item.name);
                  navigate(item.link);
                }}
                className={cn(
                  `text-lg cursor-pointer text-gray-700 hover:text-primary font-medium`,
                  tab === item.name && "text-primary"
                )}
              >
                {item.name}
              </p>
            );
          })}
          <Link to="/login">
            <button
              className="w-full px-4 py-2 rounded-md text-primary-700 border border-primary-200 transition hover:bg-primary hover:text-white cursor-pointer"
              onClick={() => {
                setIsMenuOpen(false);
              }}
            >
              Đăng nhập
            </button>
          </Link>
          <Link to="/register">
            <button
              className="w-full px-4 py-2 rounded-md bg-primary text-white transition hover:bg-primary-600 cursor-pointer"
              onClick={() => {
                setIsMenuOpen(false);
              }}
            >
              Đăng ký
            </button>
          </Link>
        </div>
        <div className="lg:hidden">
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            {!isMenuOpen ? <Menu size={30} /> : <X size={30} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="mobile-menu sticky border bg-white border-gray-300 p-3 shadow-md">
          <div className="flex flex-col space-y-4">
            {menuItems.map((item) => {
              return (
                <Link to={item.link} key={item.name}>
                  <p className="text-lg cursor-pointer text-gray-700 hover:text-primary font-medium">
                    {item.name}
                  </p>
                </Link>
              );
            })}
          </div>
          <div className="flex flex-col space-y-2 mt-4">
            <Link to="/login">
              <button
                className="w-full px-4 py-2 rounded-md text-primary-700 border border-primary-200 transition hover:bg-primary"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                Đăng nhập
              </button>
            </Link>
            <Link to="/register">
              <button
                className="w-full px-4 py-2 rounded-md bg-primary text-white transition hover:bg-primary-600"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                Đăng ký
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
