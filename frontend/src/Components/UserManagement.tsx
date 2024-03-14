import "../main.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import APIGetUsers from "../API/APIGetUsers";
import { getCookie } from "../CookieFunctions";
import useWebSocket from "react-use-websocket";
import { wsURL } from "../GlobalURL";
import { User } from "../interface";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import { Content, Header, Menu } from "../main.styles";
import ChangePassword from "./ChangePassword";

function UserManagement(input: { users: Array<User>; setUsers: Function }) {
  const navigate = useNavigate();

  let signedInUsername = sessionStorage.getItem("username");

  //WebSocket
  let token = getCookie(`token${signedInUsername}`);
  if (!signedInUsername || !token) {
    signedInUsername = "";
    token = "";
  }
  const { sendJsonMessage } = useWebSocket(wsURL, {
    share: true,
    queryParams: { username: signedInUsername, token: token },
  });

  useEffect(() => {
    async function fetchUsers() {
      const fetchedUsers = await APIGetUsers();
      if (fetchedUsers) {
        input.setUsers(fetchedUsers);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <Menu>
        <button
          title="Klicken Sie hier um zur ToDoListe zu kommen."
          onClick={() => navigate("/loggedIn/ToDoList")}
        >
          To-Do Liste
        </button>
      </Menu>
      <h1>Benutzermanagement</h1>
      <Content>
        <ChangePassword />
        {signedInUsername === "Admin" ? (
          <>
            <UserList
              users={input.users}
              setUsers={input.setUsers}
              sendJsonMessage={sendJsonMessage}
            />
            <CreateUser sendJsonMessage={sendJsonMessage} />
          </>
        ) : null}
      </Content>
    </div>
  );
}
export default UserManagement;
