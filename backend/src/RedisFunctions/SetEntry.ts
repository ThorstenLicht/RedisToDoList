import addMessagetypToString from "../AddMessagetypToString";
import { getClient } from "../GetClient";
import { CreateEntry, Info } from "../interface";

async function setEntry(entry: CreateEntry): Promise<Info> {
  try {
    const client = await getClient();
    const todoExists = await client.exists("entry:" + entry.todo);
    if (todoExists === 1) {
      return addMessagetypToString("To-Do exisitert bereits");
    } else {
      await client.sendCommand([
        "HMSET",
        "entry:" + entry.todo,
        "Eigentümer",
        entry.owner,
        "Status",
        "progress",
        "Priorität",
        "1",
      ]);
      return addMessagetypToString("To-Do angelegt");
    }
  } catch (error) {
    console.error("Error:", error);
    return addMessagetypToString("Es ist ein Fehler aufgetreten");
  }
}

export default setEntry;
