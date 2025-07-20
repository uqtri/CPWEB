import { Link, useNavigate } from "react-router-dom";
import { X, CodeIcon, Menu } from "lucide-react";
import { useAppStore } from "../../store/index";
import { useEffect, useState } from "react";
import { Dropdown } from "antd";

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
  {
    name: "Cộng đồng",
    link: "/community",
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logout = useAppStore((state) => state.logout);
  const user = useAppStore((state) => state.user);
  const navigate = useNavigate();
  const [items, setItems] = useState<any[]>([
    {
      key: "profile",
      label: <Link to="/profile">Trang cá nhân</Link>,
    },
    {
      key: "submissions",
      label: <Link to="/submissions">Các bài đã nộp</Link>,
    },
  ]);

  useEffect(() => {
    if (user?.role?.name === "admin") {
      setItems((prev) => {
        if (prev.some((item) => item.key === "admin")) {
          return prev;
        }
        return [
          ...prev,
          {
            key: "admin",
            label: <Link to="/admin">Quản trị</Link>,
          },
        ];
      });
    }
  }, [user]);
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
        <div className="hidden lg:flex lg:items-center justify-between space-x-4">
          {menuItems.map((item) => {
            return (
              <Link
                to={item.link}
                key={item.name}
                onClick={() => {
                  console.log("Clicked on menu item:", item.name);
                  setIsMenuOpen(false);
                }}
              >
                <p className="text-lg text-gray-700 hover:text-primary font-medium">
                  {item.name}
                </p>
              </Link>
            );
          })}
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            className="flex cursor-pointer"
          >
            <a onClick={(e) => e.preventDefault()}>Người dùng</a>
          </Dropdown>
          <button
            className="px-4 py-2 rounded-md bg-primary text-white transition hover:bg-primary-600"
            onClick={() => {
              logout();
            }}
          >
            Đăng xuất
          </button>
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
                // <Link to={item.link} key={item.name}>
                <p
                  key={item.name}
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate(item.link);
                  }}
                  className="text-lg text-gray-700 hover:text-primary font-medium"
                >
                  {item.name}
                </p>
                // </Link>
              );
            })}
          </div>
          <Dropdown
            menu={{ items, onClick: () => setIsMenuOpen(false) }}
            trigger={["click"]}
            className="flex cursor-pointer mt-4 text-lg font-semibold text-gray-700 hover:text-primary"
          >
            <a
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Người dùng
            </a>
          </Dropdown>
          <div className="flex flex-col space-y-2 mt-4">
            {/* <button className="w-full px-4 py-2 rounded-md text-primary-700 border border-primary-200 transition hover:bg-primary">
              Đăng xuất
            </button> */}
            <button
              className="w-full px-4 py-2 rounded-md bg-primary text-white transition hover:bg-primary-600"
              onClick={() => {
                logout();
              }}
            >
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
