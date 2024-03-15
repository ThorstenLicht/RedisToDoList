import { addError } from "../AddMessagetypToString";
import { getClient } from "../GetClient";

async function deleteUser(username: string, admin: string) {
  try {
    if (admin !== "Admin") {
      return addError("Nicht autorisiert");
    } else if (username === "Admin") {
      return addError("Admin kann nicht gelöscht werden");
    } else {
      const client = await getClient();
      const usernameExists = await client.exists(username);
      if (usernameExists !== 1) {
        return addError("Benutzer existiert nicht");
      } else {
        await client.multi().DEL(username).SREM("usersToDo", username).exec(); //Transaction with two commands
        try {
          await client.DEL("token:" + username);
        } catch {
          console.log("Kein Token vorhanden");
        }
        const sendback = {
          messagetyp: "deleteUserAdminInfo",
          message: "Benutzer gelöscht",
          username: username,
        };
        return sendback;
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return addError("Es ist ein Fehler aufgetreten");
  }
}

export default deleteUser;
