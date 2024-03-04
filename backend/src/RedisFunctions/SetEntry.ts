import { getClient } from "../GetClient";
import { CreateEntry } from "../interface";

async function setEntry(entry: CreateEntry): Promise<string> {
  try {
    const client = await getClient();
    const todoExists = await client.exists("entry:" + entry.todo);
    if (todoExists === 1) {
      return "To-Do exisitert bereits";
    } else {
      await client.sendCommand([
        "HMSET",
        "entry:" + entry.todo,
        "Eigentümer",
        entry.owner,
        "Status",
        entry.status,
        "Priorität",
        "1",
      ]);
      return "To-Do angelegt";
    }
  } catch (error) {
    console.error("Error:", error);
    return "Es ist ein Fehler aufgetreten";
  }
}

export default setEntry;
