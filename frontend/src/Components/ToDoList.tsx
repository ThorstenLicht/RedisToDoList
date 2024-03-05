import useWebSocket from "react-use-websocket";
import { wsURL } from "../GlobalURL";
import messageController from "../WS/MessageController";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Entry } from "../interface";
import RenderEntries from "./RenderEntries";

function ToDoList(input: {
  username: string;
  entries: Array<Entry>;
  setEntries: Function;
}) {
  //check if the user is logged in
  const navigate = useNavigate();
  useEffect(() => {
    if (input.username === "") {
      navigate("/");
    }
  }, [input.username]);

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(wsURL, {
    share: true,
    queryParams: { username: input.username },
  });

  useEffect(() => {
    if (lastJsonMessage) {
      messageController(lastJsonMessage, input.entries, input.setEntries);
    }
  }, [lastJsonMessage]);

  return (
    <>
      <p>ToDoList</p>
      <p>{input.username}</p>
      <RenderEntries entries={input.entries} />
    </>
  );
}

export default ToDoList;
