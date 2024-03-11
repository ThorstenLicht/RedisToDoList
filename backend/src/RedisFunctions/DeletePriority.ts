import { addError, addSuccess } from "../AddMessagetypToString";
import { Info } from "../interface";
import getEntries from "./GetEntries";
import setPriority from "./SetPriority";

async function deletePriority(username: string): Promise<Info> {
  try {
    if (username !== "Admin") {
      return addError("Sie sind nicht berechtigt");
    } else {
      const fullData = await getEntries();
      if (fullData === "Es ist ein Fehler aufgetreten") {
        return addError(
          "Es ist ein Fehler beim Abrufen der To-Do Einträge aufgetreten"
        );
      } else {
        for (const entry of fullData.entries) {
          entry.priority = "1";
          await setPriority(entry);
        }
        return addSuccess("Prioritäten zurückgesetzt");
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return addError("Es ist ein Fehler aufgetreten");
  }
}

export default deletePriority;
