import { getClient } from "../GetClient";
import { Priority } from "../interface";

async function setPriority(priority: Priority): Promise<string> {
  try {
    const client = await getClient();
    const data = await client.HGETALL("entry:" + priority.todo);
    if (parseInt(priority.priority) < 1 || parseInt(priority.priority) > 3) {
      return "Priorität muss zwischen 1 und 3 liegen";
    } else if (data.Priorität === priority.priority) {
      return "Priorität wurde nicht geändert";
    } else if (data.Status !== "progress") {
      return "To-Do ist nicht in Arbeit";
    } else {
      await client.HSET(
        "entry:" + priority.todo,
        "Priorität",
        priority.priority
      );
      return "Priorität wurde geändert";
    }
  } catch (error) {
    console.error("Error:", error);
    return "Es ist ein Fehler aufgetreten";
  }
}

export default setPriority;
