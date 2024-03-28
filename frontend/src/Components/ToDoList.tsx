import "../main.css";
import useWebSocket from "react-use-websocket";
import { wsURL } from "../GlobalURL";
import { useNavigate } from "react-router-dom";
import { Entry, ToDoListProps } from "../interface";
import RenderEntries from "./RenderEntries";
import NewEntry from "./NewEntry";
import { getCookie } from "../CookieFunctions";
import deletePriorities from "../WS/deletePriorities";
import { useEffect } from "react";
import { Menu, Content } from "../main.styles";

function ToDoList(input: ToDoListProps) {
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

  useEffect(() => {
    async function getEntries() {
      const allEntries = {
        messagetyp: "getEntries",
      };
      sendJsonMessage(allEntries);
    }
    getEntries();
  }, []);

  return (
    <>
      <Menu>
        <button
          title="Klicken Sie hier um zur Benutzerverwaltung zu kommen."
          onClick={() => navigate("/loggedIn/UserManagement")}
        >
          Benutzerverwaltung
        </button>
        {username === "admin@admin.com" && (
          <button
            title="Klicken Sie hier um alle Prioritäten zu löschen."
            onClick={() => deletePriorities(sendJsonMessage)}
          >
            Alle Prioritäten löschen
          </button>
        )}
        <NewEntry sendJsonMessage={sendJsonMessage} />
      </Menu>
      <h1>ToDoList</h1>

      <Content>
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
      </Content>
    </>
  );
}

export default ToDoList;
