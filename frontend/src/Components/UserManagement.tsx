import { useNavigate } from "react-router-dom";
import { getCookie } from "../CookieFunctions";
import useWebSocket from "react-use-websocket";
import { wsURL } from "../GlobalURL";

function UserManagement() {
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
    <div>
      <h1>Benutzermanagment</h1>
      <button
        title="Klicken Sie hier um zur ToDoListe zu kommen."
        onClick={() => navigate("/loggedIn/ToDoList")}
      >
        ToDoListe
      </button>
    </div>
  );
}

export default UserManagement;
