import { addError, addSuccess } from "../AddMessagetypToString";
import { getClient } from "../GetClient";

async function deleteEntry(title: string, username: string) {
  try {
    if (username !== "admin@admin.com") {
      return addError("Nicht autorisiert");
    } else {
      const client = await getClient();
      const entryExists = await client.exists(title);
      if (entryExists !== 1) {
        return addError("To-Do Eintrag existiert nicht");
      } else {
        await client.multi().DEL(title).SREM("entries", title).exec(); //Transaction with two commands
        return addSuccess("Eintrag wurde gelöscht");
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return addError("Es ist ein Fehler aufgetreten");
  }
}

export default deleteEntry;
