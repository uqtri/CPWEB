import { useEffect } from "react";
import "./App.css";
import WaitingScreen from "./components/WaitingScreen/WaitingScreen";
import MainRoute from "./routes/MainRoute/MainRoute";
import { useAppStore } from "./store/index";
import { ToastContainer } from "react-toastify";
function App() {
  const connectSocket = useAppStore((state) => state.connectSocket);
  useEffect(() => {
    connectSocket();
  }, []);
  return (
    <>
      <MainRoute /> <ToastContainer />
    </>
  );
}

export default App;
