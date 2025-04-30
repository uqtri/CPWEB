import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import HeaderForAnonymous from "../HeaderForAnonymous/HeaderForAnonymous";
import { Outlet } from "react-router-dom";
export default function MainLayout() {
  return (
    <div>
      {/* <Header /> */}
      <HeaderForAnonymous />
      <Outlet />

      <Footer />
    </div>
  );
}
