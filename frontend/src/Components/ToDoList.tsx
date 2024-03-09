import useWebSocket from "react-use-websocket";
import { wsURL } from "../GlobalURL";
import messageController from "../WS/MessageController";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Entry } from "../interface";
import RenderEntries from "./RenderEntries";
import { CustomToast } from "../CustomToast";
import NewEntry from "./NewEntry";
import getCookie from "../GetCookie";

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

  //useEffect(() => {}, [input.entries]);

  useEffect(() => {
    if (username === "" || token === "" || readyState === 3) {
      navigate("/");
      CustomToast.error("Verbindungsabbruch, bitte neu einloggen");
    }
  }, [username, token, readyState]);

  return (
    <>
      <p>ToDoList</p>
      <p>{username}</p>
      <NewEntry sendJsonMessage={sendJsonMessage} />
      <RenderEntries
        entries={input.entries}
        sendJsonMessage={sendJsonMessage}
      />
    </>
  );
}

export default ToDoList;
