import { deleteCookie } from "./CookieFunctions";

function logOut(sendJsonMessage: Function) {
  const username = sessionStorage.getItem("username");
  const send = {
    messagetyp: "logOut",
    username: username,
  };
  sendJsonMessage(send);
  sessionStorage.clear();
  deleteCookie(`username${username}`);
  deleteCookie(`token${username}`);
}

export default logOut;
