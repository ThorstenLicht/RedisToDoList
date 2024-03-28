import "../main.css";
import { Outlet, useNavigate } from "react-router-dom";
import { getCookie } from "../CookieFunctions";
import useWebSocket from "react-use-websocket";
import { useEffect } from "react";
import messageController from "../WS/MessageController";
import { WebsocketProps } from "../interface";
import { wsURL } from "../GlobalURL";
import logOut from "../WS/LogOut";
import { Header, LoggedInContainer, Welcome } from "../main.styles";

function Websocket(input: WebsocketProps) {
  //check if the user is logged in
  const navigate = useNavigate();
  let username = sessionStorage.getItem("username");
  let token = getCookie(`token${username}`);
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
      messageController(
        lastJsonMessage,
        input.entries,
        input.setEntries,
        input.setUsers,
        input.users
      );
    }
  }, [lastJsonMessage]);

  //if connection is lost redirect to login page
  useEffect(() => {
    if (readyState === 3) {
      navigate("/");
    }
  }, [readyState]);

  //if user is not logged in redirect to login page
  useEffect(() => {
    if (username === "" || token === "") {
      navigate("/");
    }
  }, [username, token]);

  return (
    <>
      <Header>
        <p></p>
        <h1>To-Do Liste mit der Redis Datenbank</h1>
        <LoggedInContainer>
          <p>Willkommen zurück {username}</p>
          <button
            title="Klicken Sie hier um sich abzumelden."
            onClick={() => logOut(sendJsonMessage)}
          >
            Abmelden
          </button>
        </LoggedInContainer>
      </Header>
      <Outlet />
    </>
  );
}

export default Websocket;
