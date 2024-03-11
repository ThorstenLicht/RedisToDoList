import { useState } from "react";
import APILogIn from "../API/APILogIn";
import { useNavigate } from "react-router-dom";
import APIChangePassword from "../API/APIChangePassword";
import { CustomToast } from "../CustomToast";

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const navigate = useNavigate();

  function handleUsernameChange(input: React.ChangeEvent<HTMLInputElement>) {
    setUsername(input.target.value);
  }

  function handlePasswordChange(input: React.ChangeEvent<HTMLInputElement>) {
    setPassword(input.target.value);
  }

  function handleNewPassword1Change(
    input: React.ChangeEvent<HTMLInputElement>
  ) {
    setNewPassword1(input.target.value);
  }

  function handleNewPassword2Change(
    input: React.ChangeEvent<HTMLInputElement>
  ) {
    setNewPassword2(input.target.value);
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
      if (message.status === "Erfolgreich angemeldet") {
        navigate("/loggedIn/ToDoList");
      } else {
        setChangePassword(true);
      }
    }
    setIsLoading(false);
  }

  async function passwordChange() {
    setIsLoading(true);
    if (newPassword1 !== newPassword2) {
      CustomToast.error("Passwörter stimmen nicht überein");
      setNewPassword1("");
      setNewPassword2("");
      setIsLoading(false);
    } else {
      const message = await APIChangePassword(username, newPassword1);
      if (message) {
        navigate("/loggedIn/ToDoList");
      }
      setIsLoading(false);
    }
  }

  if (changePassword) {
    return (
      <div>
        <p>Neues Passwort</p>
        <input
          type="password"
          placeholder="Passwort"
          title="Geben Sie hier ihr Passwort ein."
          value={newPassword1}
          onChange={handleNewPassword1Change}
        />
        <p>Neues Passwort wiederholen</p>
        <input
          type="password"
          placeholder="Passwort"
          title="Geben Sie hier ihr Passwort ein."
          value={newPassword2}
          onChange={handleNewPassword2Change}
        />
        <button
          title="Klicken Sie hier um das Passwot zu ändern und sich einzuloggen."
          onClick={() => passwordChange()}
          disabled={isLoading}
          style={{ cursor: isLoading ? "wait" : "pointer" }}
        >
          {isLoading ? "Lädt..." : "Ändern"}
        </button>
      </div>
    );
  } else {
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
}

export default LogIn;
