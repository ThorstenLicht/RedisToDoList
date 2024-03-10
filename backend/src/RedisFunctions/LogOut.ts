import addMessagetypToString from "../AddMessagetypToString";
import { getClient } from "../GetClient";

async function logOut(username: string) {
  try {
    const client = await getClient();
    const result = await client.DEL("token:" + username);
    if (result === 0) {
      return addMessagetypToString("Kein Eintrag in der Datenbank gefunden");
    } else {
      return addMessagetypToString("Sie wurden erfolgreich ausgeloggt");
    }
  } catch (error) {
    console.error("Error:", error);
    return addMessagetypToString("Es ist ein Fehler aufgetreten");
  }
}

export default logOut;
