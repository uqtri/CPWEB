import { Book, Code, CodeIcon, LocationEdit, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import type { MenuProps } from "antd";

// Data đồng bộ
const menuItems = [
  [
    { label: "Thử thách", link: "/problemset" },
    { label: "Cuộc thi", link: "/contests" },
    { label: "Bảng xếp hạng", link: "/leaderboard" },
    { label: "Cộng đồng", link: "/community" },
    { label: "Học tập", link: "/" },
  ],
  [
    { label: "Hướng dẫn", link: "/" },
    { label: "Thuật toán", link: "/" },
    { label: "Cấu trúc dữ liệu", link: "/" },
    { label: "Giải thuật", link: "/" },
    { label: "Công cụ", link: "/" },
  ],
  [
    {
      label: "TP. Hồ Chí Minh, Trường ĐH Công Nghệ Thông Tin",
      icon: <LocationEdit />,
      link: "/",
    },
    { label: "(+84) 981411382", icon: <Phone />, link: "/" },
    { label: "23521649@gm.uit.edu.vn", icon: <Mail />, link: "/" },
  ],
];

// Đồng bộ menuMobile với menuItems
const menuMobile: MenuProps["items"] = [
  {
    key: "platform",
    label: "Nền tảng",
    icon: <Code />,
    children: menuItems[0].map((item) => ({
      key: item.label,
      label: <Link to={item.link}>{item.label}</Link>,
    })),
  },
  {
    key: "resources",
    label: "Tài nguyên",
    icon: <Book />,
    children: menuItems[1].map((item) => ({
      key: item.label,
      label: <Link to={item.link}>{item.label}</Link>,
    })),
  },
  {
    key: "contact",
    label: "Liên hệ",
    icon: <Mail />,
    children: menuItems[2].map((item: any) => ({
      key: item.label,
      label: (
        <Link to={item.link} className="flex items-center gap-2">
          {item.icon}
          {item.label}
        </Link>
      ),
    })),
  },
];

export default function Footer() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-10 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Logo + Giới thiệu */}
      <div>
        <Link to="/">
          <div className="flex items-center gap-4">
            <CodeIcon
              size={30}
              className="bg-primary p-[5px] rounded-md text-white animate-logo"
            />
            <p className="font-bold text-primary text-xl">CodeForge</p>
          </div>
        </Link>
        <p className="mt-4">
          Nền tảng lập trình thi đấu hàng đầu Việt Nam, nơi các lập trình viên
          phát triển kỹ năng và thách thức bản thân qua các cuộc thi coding
          chuyên nghiệp.
        </p>
      </div>

      {/* Nền tảng */}
      <div className="hidden md:block">
        <h2 className="text-lg font-semibold mb-2 flex gap-2 items-center">
          <Code /> Nền tảng
        </h2>
        <ul className="space-y-2">
          {menuItems[0].map((item) => (
            <li key={item.label}>
              <Link to={item.link} className="hover:text-primary transition">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Tài nguyên */}
      <div className="hidden md:block">
        <h2 className="text-lg font-semibold mb-2 flex gap-2 items-center">
          <Book /> Tài nguyên
        </h2>
        <ul className="space-y-2">
          {menuItems[1].map((item) => (
            <li key={item.label}>
              <Link to={item.link} className="hover:text-primary transition">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Liên hệ */}
      <div className="hidden md:block">
        <h2 className="text-lg font-semibold mb-2 flex gap-2 items-center">
          <Mail /> Liên hệ
        </h2>
        <ul className="space-y-2">
          {menuItems[2].map((item: any) => (
            <li key={item.label}>
              <Link
                to={item.link}
                className="hover:text-primary transition flex items-center gap-2"
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden col-span-full">
        <Menu
          mode="inline"
          items={menuMobile}
          className="bg-transparent text-white"
          theme="dark"
        />
      </div>
    </div>
  );
}
