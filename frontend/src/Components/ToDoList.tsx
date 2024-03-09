import useWebSocket from "react-use-websocket";
import { wsURL } from "../GlobalURL";
import messageController from "../WS/MessageController";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Entry } from "../interface";
import RenderEntries from "./RenderEntries";
import NewEntry from "./NewEntry";
import { getCookie } from "../CookieFunctions";
import logOut from "../LogOut";
function ToDoList(input: { entries: Array<Entry>; setEntries: Function }) {
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
      messageController(lastJsonMessage, input.entries, input.setEntries);
    }
  }, [lastJsonMessage]);

  //if connection is lost, redirect to login page
  useEffect(() => {
    if (username === "" || token === "" || readyState === 3) {
      navigate("/");
    }
  }, [username, token, readyState]);

  return (
    <>
      <p>ToDoList</p>
      <p>Willkommen zurück {username}</p>
      <button
        title="Klicken Sie hier um sich abzumelden."
        onClick={() => logOut(sendJsonMessage)}
      >
        Abmelden
      </button>
      <NewEntry sendJsonMessage={sendJsonMessage} />
      <RenderEntries
        entries={input.entries}
        sendJsonMessage={sendJsonMessage}
      />
    </>
  );
}

export default ToDoList;
