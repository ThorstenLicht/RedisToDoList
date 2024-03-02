import { connections } from "..";

function broadcast(message: any) {
  Object.keys(connections).forEach((username) => {
    const connection = connections[username];
    const send = JSON.stringify(message);
    connection.send(send);
  });
}

function handleMessage(bytes: any, username: string) {
  const message = JSON.parse(bytes.toString());
  console.log(username, "send", message);
  broadcast(message);
}
export default handleMessage;
