import { addError, addSuccess } from "../AddMessagetypToString";
import { getClient } from "../GetClient";

async function logOut(username: string) {
  try {
    const client = await getClient();
    const result = await client.DEL("token:" + username);
    if (result === 0) {
      return addError("Kein Eintrag in der Datenbank gefunden");
    } else {
      return addSuccess("Sie wurden erfolgreich ausgeloggt");
    }
  } catch (error) {
    console.error("Error:", error);
    return addError("Es ist ein Fehler aufgetreten");
  }
}

export default logOut;
