import { useState } from "react";
import { UserForm } from "../main.styles";
import { CustomToast } from "../CustomToast";

function CreateUser(input: { sendJsonMessage: Function }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleUsernameChange(input: React.ChangeEvent<HTMLInputElement>) {
    setUsername(input.target.value);
  }

  function handlePasswordChange(input: React.ChangeEvent<HTMLInputElement>) {
    setPassword(input.target.value);
  }

  function handleCreateUser() {
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegEx.test(username)) {
      console.error("Ungültige E-Mail-Adresse");
      CustomToast.error("Ungültige E-Mail-Adresse");
    } else {
      const message = {
        messagetyp: "setUser",
        logInData: { username: username, password: password },
      };
      input.sendJsonMessage(message);
      setUsername("");
      setPassword("");
    }
  }

  return (
    <UserForm>
      <h1>neuen Benutzer anlegen</h1>
      <p>Benutzername</p>
      <input
        type="text"
        placeholder="E-Mail"
        title="Gebe hier die E-Mail ein."
        value={username}
        onChange={handleUsernameChange}
        required
      />
      <p>Passwort</p>
      <input
        type="text"
        placeholder="Einmalpasswort"
        title="Gebe hier ein Passwort ein."
        value={password}
        onChange={handlePasswordChange}
      />
      <button title="Benutzer anlegen" onClick={() => handleCreateUser()}>
        Benutzer anlegen
      </button>
    </UserForm>
  );
}
export default CreateUser;
