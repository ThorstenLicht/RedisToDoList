import { addError } from "../AddMessagetypToString";
import { getClient } from "../GetClient";

async function setUser(username: string, password: string, admin: string) {
  try {
    if (admin !== "Admin") {
      return addError("Sie sind nicht berechtigt, diese Funktion zu nutzen.");
    } else {
      const client = await getClient();
      const usernameExists = await client.exists(username);
      if (usernameExists === 1) {
        return addError("Benutzer exisitert bereits");
      } else {
        await client
          .multi()
          .set(username, password, {
            EX: 3600, //TTL 1 Stunde
            NX: true, //Eindeutiger Schlüssel
          })
          .SADD("usersToDo", username)
          .exec();
        return "Nutzer wurde angelegt";
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return addError("Es ist ein Fehler aufgetreten.");
  }
}

export default setUser;
