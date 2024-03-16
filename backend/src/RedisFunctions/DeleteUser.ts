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
        const existsToken = await client.exists("token:" + username);
        if (existsToken !== 1) {
          await client.multi().DEL(username).SREM("usersToDo", username).exec(); //Transaction with two commands
        } else {
          await client
            .multi()
            .DEL(username)
            .SREM("usersToDo", username)
            .DEL("token:" + username)
            .exec(); //Transaction with three commands
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
