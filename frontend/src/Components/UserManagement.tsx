import { useEffect, useState } from "react";
import APILogIn from "../API/APILogIn";
import { useNavigate } from "react-router-dom";
import APICreateUser from "../API/APICreateUser";
import { CustomToast } from "../CustomToast";
import APIGetUsers from "../API/APIGetUsers";

function UserManagement() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<string[]>([]);

  const navigate = useNavigate();

  function handleUsernameChange(input: React.ChangeEvent<HTMLInputElement>) {
    setUsername(input.target.value);
  }

  function handlePasswordChange(input: React.ChangeEvent<HTMLInputElement>) {
    setPassword(input.target.value);
  }

  const [isLoading, setIsLoading] = useState(false);

  async function handleCreateUser() {
    const message = await APICreateUser(username, password);
    if (message) {
      CustomToast.success("Benutzer erfolgreich angelegt");
      setUsers([...users, username]);
    }
    // setIsLoading(true);
    // const message = await APILogIn(username, password);
    // if (message) {
    //   localStorage.setItem(`username${username}`, username);
    //   localStorage.setItem(`token${username}`, message.token);
    //   navigate("/ToDoList");
    // }
    // setIsLoading(false);
  }

  useEffect(() => {
    async function fetchUsers() {
      const fetchedUsers = await APIGetUsers();
      if (fetchedUsers) {
        setUsers(fetchedUsers);
      }
    }
    fetchUsers();
  }, []);

  function AllUsers() {
    if (users.length === 0) {
      return <p>Keine Benutzer vorhanden</p>;
    }

    return (
      <div>
        {users.map((user: string) => (
          <p key={user}>{user}</p>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h1>bestehende Benutzer</h1>

      <AllUsers />

      <h1>neuen Benutzer anlegen</h1>
      <p>Benutzername</p>
      <input
        type="text"
        placeholder="Benutzername"
        title="Geben Sie hier ihren Benutzernamen ein."
        value={username}
        onChange={handleUsernameChange}
      />
      <p>Passwort</p>
      <input
        type="text"
        placeholder="Einmalpasswort"
        title="Geben Sie hier ihr Passwort ein."
        value={password}
        onChange={handlePasswordChange}
      />
      <button
        title="Benutzer anlegen"
        onClick={() => handleCreateUser()}
        disabled={isLoading}
        style={{ cursor: isLoading ? "wait" : "pointer" }}
      >
        Benutzer anlegen
      </button>
    </div>
  );
}
export default UserManagement;
