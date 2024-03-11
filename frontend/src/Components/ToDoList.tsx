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
  const entriesProgress: Array<Entry> = [];
  const entriesCompleted: Array<Entry> = [];
  const entriesDeleted: Array<Entry> = [];

  input.entries.forEach((entry) => {
    if (entry.status === "progress") {
      entriesProgress.push(entry);
    } else if (entry.status === "completed") {
      entriesCompleted.push(entry);
    } else if (entry.status === "deleted") {
      entriesDeleted.push(entry);
    }
  });

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
      <h2>ToDos in Bearbeitung</h2>
      <RenderEntries
        entries={entriesProgress}
        sendJsonMessage={sendJsonMessage}
        allEntries={input.entries}
        setEntries={input.setEntries}
      />
      <h2>Abgeschlossene ToDos</h2>
      <RenderEntries
        entries={entriesCompleted}
        sendJsonMessage={sendJsonMessage}
        allEntries={input.entries}
        setEntries={input.setEntries}
      />
      <h2>Entfernte ToDos</h2>
      <RenderEntries
        entries={entriesDeleted}
        sendJsonMessage={sendJsonMessage}
        allEntries={input.entries}
        setEntries={input.setEntries}
      />
    </>
  );
}

export default ToDoList;
