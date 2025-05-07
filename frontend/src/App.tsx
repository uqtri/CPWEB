import { useEffect } from "react";
import "./App.css";
import WaitingScreen from "./components/WaitingScreen/WaitingScreen";
import MainRoute from "./routes/MainRoute/MainRoute";
import { useAppStore } from "./store/index";
function App() {
  const connectSocket = useAppStore((state) => state.connectSocket);
  useEffect(() => {
    connectSocket();
  }, []);
  return (
    <>
      <MainRoute />{" "}
    </>
  );
}

export default App;
