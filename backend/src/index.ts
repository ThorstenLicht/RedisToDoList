import express from "express";
import cors from "cors";
import helmet from "helmet";
import Controller from "./controllers/controller";
import ws from "ws";
import handleMessage from "./wsFunctions/HandleMessage";
import handleClose from "./wsFunctions/HandleClose";
import { ConnectionMap } from "./interface";

const PORT = 8080;
const app = express();
const wsServer = new ws.Server({ noServer: true }); //headless websocket server
export const connections: ConnectionMap = {};

wsServer.on("connection", (connection, request) => {
  const url = request?.url;
  if (url) {
    const username = new URL(url, "ws://localhost").searchParams.get(
      "username"
    );
    if (username) {
      console.log(`User connected: ${username}`);
      connections[username] = connection;
      connection.on("message", (message) => handleMessage(message, username));
      connection.on("close", () => handleClose(username));
    }
  }
});

// Setup Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());

// Setup Controller
app.use("/api", Controller);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
server.on("upgrade", (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (socket) => {
    wsServer.emit("connection", socket, request);
  });
});
