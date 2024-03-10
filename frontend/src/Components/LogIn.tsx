import { useState } from "react";
import APILogIn from "../API/APILogIn";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleUsernameChange(input: React.ChangeEvent<HTMLInputElement>) {
    setUsername(input.target.value);
  }

  function handlePasswordChange(input: React.ChangeEvent<HTMLInputElement>) {
    setPassword(input.target.value);
  }

  const [isLoading, setIsLoading] = useState(false);

  async function handleLogIn() {
    setIsLoading(true);
    const message = await APILogIn(username, password);
    if (message) {
      sessionStorage.setItem("username", username);
      document.cookie = `username${username}=${username}; expires=${new Date(
        Date.now() + 24 * 60 * 60 * 1000
      ).toUTCString()}`;
      document.cookie = `token${username}=${message.token}; expires=${new Date(
        Date.now() + 24 * 60 * 60 * 1000
      ).toUTCString()}`;
      navigate("/loggedIn/ToDoList");
    }
    setIsLoading(false);
  }

  return (
    <div>
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
        type="password"
        placeholder="Passwort"
        title="Geben Sie hier ihr Passwort ein."
        value={password}
        onChange={handlePasswordChange}
      />
      <button
        title="Klicken Sie hier um sich einzuloggen."
        onClick={() => handleLogIn()}
        disabled={isLoading}
        style={{ cursor: isLoading ? "wait" : "pointer" }}
      >
        {isLoading ? "Lädt..." : "Anmelden"}
      </button>
    </div>
  );
}

export default LogIn;
