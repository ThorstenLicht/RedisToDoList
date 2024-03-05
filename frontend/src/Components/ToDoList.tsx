import useWebSocket from "react-use-websocket";
import { wsURL } from "../GlobalURL";
import lastMessage from "../WS/LastMessage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function newEntry(sendMessage: Function) {
  const entry = {
    messagetyp: "new",
    entry: {
      todo: "Meeting13",
      owner: "Admin",
      status: "progress",
    },
  };
  sendMessage(entry);
}

function ToDoList(input: { username: string }) {
  //check if the user is logged in
  const navigate = useNavigate();
  useEffect(() => {
    if (input.username === "") {
      navigate("/");
    }
  }, []);

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(wsURL, {
    share: true,
    queryParams: { username: input.username },
  });

  if (lastJsonMessage) {
    lastMessage(lastJsonMessage);
  }

  return (
    <>
      <p>ToDoList</p>
      <p>{input.username}</p>
      <button onClick={() => newEntry(sendJsonMessage)}>
        Neuen Eintrag erstellen
      </button>
    </>
  );
}

export default ToDoList;
