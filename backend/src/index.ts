import express from "express";
import cors from "cors";
import helmet from "helmet";
import Controller from "./controllers/controller";
import ws from "ws";
import handleMessage from "./wsFunctions/HandleMessage";
import handleClose from "./wsFunctions/HandleClose";
import { ConnectionMap } from "./interface";
import entriesAfterLogIn from "./wsFunctions/EntriesAfterLogIn";
import { getClient } from "./GetClient";
import { addError } from "./AddMessagetypToString";

const PORT = 8080;
const app = express();
const wsServer = new ws.Server({ noServer: true }); //headless websocket server
export const connections: ConnectionMap = {};

wsServer.on("connection", async (connection, request) => {
  const url = request?.url;
  if (url) {
    const params = new URL(url, "ws://localhost").searchParams;
    const username = params.get("username");
    const token = params.get("token");

    if (username) {
      if (connections.hasOwnProperty(username)) {
        const sendback = JSON.stringify(
          addError(`${username} ist bereits angemeldet.`)
        );
        connection.send(sendback);
        console.log(`Duplicate connection attempt for username: ${username}`);
        connection.close();
      } else {
        connections[username] = connection;
        const client = await getClient();
        const savedToken = await client.get("token:" + username);
        if (savedToken === token) {
          console.log(`User connected: ${username} with token: ${token}`);
          entriesAfterLogIn(connection);
          connection.on("message", (message) =>
            handleMessage(message, username)
          );
        } else {
          const sendback = JSON.stringify(
            addError("Üngültiger Token oder Benutzername")
          );
          connection.send(sendback);
          console.log(
            `${username} tried to connect with invalid token ${token}`
          );
          connection.close();
        }
        connection.on("close", () => handleClose(username));
      }
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
