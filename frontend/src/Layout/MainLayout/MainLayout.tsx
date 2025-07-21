import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import HeaderForAnonymous from "../HeaderForAnonymous/HeaderForAnonymous";
import { Outlet } from "react-router-dom";
import { useAppStore } from "../../store/index";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
export default function MainLayout() {
  const user = useAppStore((state) => state.user);
  return (
    <div className="bg-gray-100 pt-22">
      <></>
      <ScrollToTop />
      <div className="min-h-screen">
        {user ? <Header /> : <HeaderForAnonymous />}
        <div className="max-w-screen-xl lg:max-w-screen-2xl px-3 lg:px-10 lg:py-5 mx-auto">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
