import { useState } from "react";
import APILogIn from "../API/APILogIn";

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleUsernameChange(input: React.ChangeEvent<HTMLInputElement>) {
    setUsername(input.target.value);
  }

  function handlePasswordChange(input: React.ChangeEvent<HTMLInputElement>) {
    setPassword(input.target.value);
  }

  async function handleLogIn() {
    if (await APILogIn(username, password)) {
      window.location.href = "/ToDoList";
    }
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
      >
        Anmelden
      </button>
    </div>
  );
}

export default LogIn;
