import getEntries from "./GetEntries";
import setPriority from "./SetPriority";

async function deletePriority(username: string): Promise<string> {
  try {
    if (username !== "Admin") {
      return "Sie sind nicht berechtigt";
    } else {
      const entries = await getEntries();
      if (entries === "Es ist ein Fehler aufgetreten") {
        return "Es ist ein Fehler beim Abrufen der To-Do Einträge aufgetreten";
      } else {
        for (const entry of entries) {
          entry.priority = "1";
          await setPriority(entry);
        }
        return "Prioritäten zurückgesetzt";
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return "Es ist ein Fehler aufgetreten";
  }
}

export default deletePriority;
