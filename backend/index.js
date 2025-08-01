import http from "http";
import express from "express";
import cors from "cors";
import routeApp from "./routes/index.js";
import "./jobs/workers/cpp.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5002;  
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://192.168.1.36:5173",
      "codeforge.id.vn",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
routeApp(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
