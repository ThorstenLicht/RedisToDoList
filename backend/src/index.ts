import express from "express";
import cors from "cors";
import helmet from "helmet";
import Controller from "./controllers/controller";

const PORT = 8080;
const server = express();

// Setup Middlewares
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());
server.use(helmet());

// Setup Event Controller
server.use("/api", Controller);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
