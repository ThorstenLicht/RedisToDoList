import { connections, tokenUserMap } from "..";

function handleClose(username: string) {
  console.log(username, "disconnected");
  delete tokenUserMap[username];
  delete connections[username];
}
export default handleClose;
