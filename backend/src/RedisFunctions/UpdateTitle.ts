import { addError, addSuccess } from "../AddMessagetypToString";
import { getClient } from "../GetClient";

async function updateTitle(newTitle: string, oldTitle: string, owner: string) {
  try {
    const client = await getClient();
    const entry = await client.HGETALL(oldTitle);
    if (entry === null) {
      return addError("Eintrag existiert nicht");
    } else {
      if (owner !== entry.Eigentümer && owner !== "admin@admin.com") {
        return addError("Nicht autorisiert");
      } else {
        if (newTitle.includes("@")) {
          return addError("Das @-Zeichen ist nicht erlaubt");
        } else {
          await client
            .multi()
            .DEL(oldTitle)
            .SREM("entries", oldTitle)
            .HSET(newTitle, [
              "Eigentümer",
              entry.Eigentümer,
              "Status",
              entry.Status,
              "Priorität",
              entry.Priorität,
            ])
            .SADD("entries", newTitle)
            .exec();
          return addSuccess("Eintrag wurde geupdated");
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return addError("Es ist ein Fehler aufgetreten");
  }
}

export default updateTitle;
