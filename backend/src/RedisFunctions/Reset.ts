import { addError, addInfo } from "../AddMessagetypToString";
import { getClient } from "../GetClient";

async function reset(username: string) {
  try {
    if (username !== "Admin") {
      return addError("Keine Berechtigung");
    } else {
      const client = await getClient();
      await client.flushDb();
      return addInfo("To-Do Liste inklusive Benutzer wurde vom Admin gelöscht");
    }
  } catch (error) {
    console.error("Error:", error);
    return addError("Es ist ein Fehler aufgetreten");
  }
}

export default reset;
