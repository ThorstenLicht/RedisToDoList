import { useState } from "react";
import { CustomToast } from "../CustomToast";
import APIChangePassword from "../API/APIChangePassword";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const username = sessionStorage.getItem("username");

  function handleOldPasswordChange(input: React.ChangeEvent<HTMLInputElement>) {
    setOldPassword(input.target.value);
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

  async function passwordChange() {
    setIsLoading(true);
    if (newPassword1 !== newPassword2) {
      CustomToast.error("Passwörter stimmen nicht überein");
    } else {
      if (username) {
        const message = await APIChangePassword(
          username,
          oldPassword,
          newPassword1
        );
        CustomToast.info(message);
      } else {
        CustomToast.error("Kein Benutzername erkannt");
      }
      setOldPassword("");
      setNewPassword1("");
      setNewPassword2("");
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h1>Password ändern</h1>
      <p>Altes Passwort zur Bestätigung</p>
      <input
        type="password"
        placeholder="altes Passwort"
        title="Gebe hier Dein altes Passwort ein."
        value={oldPassword}
        onChange={handleOldPasswordChange}
      />

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
    </div>
  );
}

export default ChangePassword;
