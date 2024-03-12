import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import APIGetUsers from "../API/APIGetUsers";
import { getCookie } from "../CookieFunctions";
import useWebSocket from "react-use-websocket";
import { wsURL } from "../GlobalURL";
import { User } from "../interface";
import UserList from "./UserList";
import CreateUser from "./CreateUser";

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
      <h1>Benutzermanagment</h1>

      <button
        title="Klicken Sie hier um zur ToDoListe zu kommen."
        onClick={() => navigate("/loggedIn/ToDoList")}
      >
        ToDoListe
      </button>
      <UserList
        users={input.users}
        setUsers={input.setUsers}
        sendJsonMessage={sendJsonMessage}
      />
      <CreateUser sendJsonMessage={sendJsonMessage} />
    </div>
  );
}
export default UserManagement;
