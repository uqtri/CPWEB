import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import HeaderForAnonymous from "../HeaderForAnonymous/HeaderForAnonymous";
import { Outlet } from "react-router-dom";
import { useAppStore } from "../../store/index";
export default function MainLayout() {
  const user = useAppStore((state) => state.user);

  return (
    <div>
      {user ? <Header /> : <HeaderForAnonymous />}
      <div className="mt-22 max-w-screen-3xl px-10 py-5 mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
