import useWebSocket from "react-use-websocket";
import { wsURL } from "../GlobalURL";
import { useNavigate } from "react-router-dom";
import { Entry } from "../interface";
import RenderEntries from "./RenderEntries";
import NewEntry from "./NewEntry";
import { getCookie } from "../CookieFunctions";

function ToDoList(input: { entries: Array<Entry>; setEntries: Function }) {
  const navigate = useNavigate();
  let username = sessionStorage.getItem("username");

  //WebSocket
  let token = getCookie(`token${username}`);
  if (!username || !token) {
    username = "";
    token = "";
  }
  const { sendJsonMessage } = useWebSocket(wsURL, {
    share: true,
    queryParams: { username: username, token: token },
  });

  return (
    <>
      <h1>ToDoList</h1>
      <button
        title="Klicken Sie hier um zur Benutzerverwaltung zu kommen."
        onClick={() => navigate("/loggedIn/UserManagement")}
      >
        Benutzerverwaltung
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
