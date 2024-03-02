import { connections } from "..";

function handleClose(username: string) {
  console.log(username, "disconnected");
  delete connections[username];
}
export default handleClose;
