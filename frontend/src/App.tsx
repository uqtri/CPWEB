import { useEffect } from "react";
import "./App.css";
import MainRoute from "./routes/MainRoute/MainRoute";
import { useAppStore } from "./store/index";
import { ToastContainer } from "react-toastify";
function App() {
  const connectSocket = useAppStore((state) => state.connectSocket);
  const login = useAppStore((state) => state.login);

  useEffect(() => {
    const init = async () => {
      await login({ email: "", password: "" });
      connectSocket();
    };
    init();
  }, []);
  return (
    <>
      <MainRoute /> <ToastContainer />
    </>
  );
}

export default App;
