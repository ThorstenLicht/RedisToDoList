import addMessagetypToString from "../AddMessagetypToString";
import { Info } from "../interface";
import getEntries from "./GetEntries";
import setPriority from "./SetPriority";

async function deletePriority(username: string): Promise<Info> {
  try {
    if (username !== "Admin") {
      return addMessagetypToString("Sie sind nicht berechtigt");
    } else {
      const fullData = await getEntries();
      if (fullData === "Es ist ein Fehler aufgetreten") {
        return addMessagetypToString(
          "Es ist ein Fehler beim Abrufen der To-Do Einträge aufgetreten"
        );
      } else {
        for (const entry of fullData.entries) {
          entry.priority = "1";
          await setPriority(entry);
        }
        return addMessagetypToString("Prioritäten zurückgesetzt");
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return addMessagetypToString("Es ist ein Fehler aufgetreten");
  }
}

export default deletePriority;
