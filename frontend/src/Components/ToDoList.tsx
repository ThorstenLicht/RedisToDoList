import useWebSocket from "react-use-websocket";
import { wsURL } from "../GlobalURL";
import messageController from "../WS/MessageController";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Entry } from "../interface";
import RenderEntries from "./RenderEntries";

function ToDoList(input: { entries: Array<Entry>; setEntries: Function }) {
  //check if the user is logged in
  const navigate = useNavigate();
  let username = localStorage.getItem("username");
  let token = localStorage.getItem("token");
  if (!username || !token) {
    username = "";
    token = "";
  }
  useEffect(() => {
    if (username === "" || token === "") {
      navigate("/");
    }
  }, [username, token]);

  //WebSocket
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(wsURL, {
    share: true,
    queryParams: { username: username, token: token },
  });

  useEffect(() => {
    if (lastJsonMessage) {
      messageController(lastJsonMessage, input.entries, input.setEntries);
    }
  }, [lastJsonMessage]);

  return (
    <>
      <p>ToDoList</p>
      <p>{username}</p>
      <RenderEntries entries={input.entries} />
    </>
  );
}

export default ToDoList;
