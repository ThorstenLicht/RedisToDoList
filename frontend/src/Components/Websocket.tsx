import { Outlet, OutletProps, useNavigate } from "react-router-dom";
import { getCookie } from "../CookieFunctions";
import useWebSocket from "react-use-websocket";
import { useEffect } from "react";
import messageController from "../WS/MessageController";
import { Entry } from "../interface";
import { wsURL } from "../GlobalURL";
import logOut from "../LogOut";
import { CustomToast } from "../CustomToast";

function Websocket(input: { entries: Array<Entry>; setEntries: Function }) {
  //check if the user is logged in
  const navigate = useNavigate();
  let username = sessionStorage.getItem("username");
  let token = getCookie(`token${username}`);
  console.log(username, token);
  if (!username || !token) {
    username = "";
    token = "";
  }

  //WebSocket
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(wsURL, {
    share: true,
    queryParams: { username: username, token: token },
  });

  useEffect(() => {
    if (lastJsonMessage) {
      messageController(lastJsonMessage, input.entries, input.setEntries);
    }
  }, [lastJsonMessage]);

  //if connection is lost, redirect to login page
  useEffect(() => {
    if (username === "" || token === "" || readyState === 3) {
      console.log(username, token, readyState);
      navigate("/");
    }
  }, [username, token, readyState]);

  return (
    <>
      <p>Willkommen zurück {username}</p>
      <button
        title="Klicken Sie hier um sich abzumelden."
        onClick={() => logOut(sendJsonMessage)}
      >
        Abmelden
      </button>
      <Outlet />
    </>
  );
}

export default Websocket;
