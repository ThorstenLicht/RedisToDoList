import addMessagetypToString from "../AddMessagetypToString";
import { getClient } from "../GetClient";
import { Info, Priority } from "../interface";

async function setPriority(priority: Priority): Promise<Info> {
  try {
    const client = await getClient();
    const data = await client.HGETALL("entry:" + priority.todo);
    if (parseInt(priority.priority) < 1 || parseInt(priority.priority) > 3) {
      return addMessagetypToString("Priorität muss zwischen 1 und 3 liegen");
    } else if (data.Priorität === priority.priority) {
      return addMessagetypToString("Priorität wurde nicht geändert");
    } else if (data.Status !== "progress") {
      return addMessagetypToString("To-Do ist nicht in Arbeit");
    } else {
      await client.HSET(
        "entry:" + priority.todo,
        "Priorität",
        priority.priority
      );
      return addMessagetypToString("Priorität wurde geändert");
    }
  } catch (error) {
    console.error("Error:", error);
    return addMessagetypToString("Es ist ein Fehler aufgetreten");
  }
}

export default setPriority;
