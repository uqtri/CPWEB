import http from "http";
import express from "express";
import cors from "cors";
import routeApp from "./routes/index.js";
import "./jobs/workers/cpp.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
routeApp(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
