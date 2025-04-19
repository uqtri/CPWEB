import http from "http";
import express from "express";
import cors from "cors";
import routeApp from "./routes/index.js";
const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

routeApp(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
