import "../main.css";
import { useEffect, useState } from "react";
import APILogIn from "../API/APILogIn";
import { useNavigate } from "react-router-dom";
import APIChangePassword from "../API/APIChangePassword";
import { CustomToast } from "../CustomToast";
import { LogInContainer } from "../main.styles";
import APICreateAdmin from "../API/APICreateAdmin";
import APIExistsAdmin from "../API/AdminExists";

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [adminNotExists, setAdminNotExists] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await APIExistsAdmin();
      if (!result) {
        setAdminNotExists(false);
      }
    };
    fetchData();
  }, []);

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

  async function handleLogIn(username: string, password: string) {
    setIsLoading(true);
    const message = await APILogIn(username, password);
    if (message) {
      sessionStorage.setItem("username", username);
      document.cookie = `username${username}=${username}; expires=${new Date(
        Date.now() + 24 * 60 * 60 * 1000
      ).toUTCString()}; path=/`;
      document.cookie = `token${username}=${message.token}; expires=${new Date(
        Date.now() + 24 * 60 * 60 * 1000
      ).toUTCString()}; path=/`;
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
      const message = await APIChangePassword(username, password, newPassword1);
      if (message === "Passwort erfolgreich geändert") {
        navigate("/loggedIn/ToDoList");
      }
      setIsLoading(false);
    }
  }

  async function handleCreateAdmin() {
    const message = await APICreateAdmin();
    if (message) {
      CustomToast.success(message);
      setPassword("root");
      setUsername("Admin");
      handleLogIn("Admin", "root");
    }
  }

  if (changePassword) {
    return (
      <LogInContainer>
        <h2>Registrierung abschließen</h2>
        <p>Neues Passwort</p>
        <input
          type="password"
          placeholder="neues Passwort"
          title="Gebe hier Dein neues Passwort ein."
          value={newPassword1}
          onChange={handleNewPassword1Change}
        />
        <p>Neues Passwort wiederholen</p>
        <input
          type="password"
          placeholder="Passwort"
          title="Gebe hier erneut Dein neues Passwort ein."
          value={newPassword2}
          onChange={handleNewPassword2Change}
        />
        <button
          title="Klicke hier um Dein Passwort zu ändern und sich einzuloggen."
          onClick={() => passwordChange()}
          disabled={isLoading}
          style={{ cursor: isLoading ? "wait" : "pointer" }}
        >
          {isLoading ? "Lädt..." : "Ändern"}
        </button>
      </LogInContainer>
    );
  } else {
    return (
      <LogInContainer>
        <h2>Anmeldung</h2>
        <p>Benutzername</p>
        <input
          type="text"
          placeholder="Benutzername"
          title="Gebe hier Deinen Benutzernamen ein."
          value={username}
          onChange={handleUsernameChange}
        />
        <p>Passwort</p>
        <input
          type="password"
          placeholder="Passwort"
          title="Gebe hier Dein Passwort ein."
          value={password}
          onChange={handlePasswordChange}
        />
        <button
          title="Klicke hier um Dich einzuloggen."
          onClick={() => handleLogIn(username, password)}
          disabled={isLoading}
          style={{ cursor: isLoading ? "wait" : "pointer" }}
        >
          {isLoading ? "Lädt..." : "Anmelden"}
        </button>
        {!adminNotExists ? null : (
          <button
            title="Klicke hier um einen Admin anzulegen."
            onClick={() => handleCreateAdmin()}
            disabled={isLoading}
            style={{ cursor: isLoading ? "wait" : "pointer" }}
          >
            {isLoading ? "Lädt..." : "Admin erstellen"}
          </button>
        )}
      </LogInContainer>
    );
  }
}

export default LogIn;
