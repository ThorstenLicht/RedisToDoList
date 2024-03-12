import { useState } from "react";

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
    const message = {
      messagetyp: "setUser",
      logInData: { username: username, password: password },
    };
    console.log(message);
    input.sendJsonMessage(message);
  }

  return (
    <>
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
      <button title="Benutzer anlegen" onClick={() => handleCreateUser()}>
        Benutzer anlegen
      </button>
    </>
  );
}
export default CreateUser;
