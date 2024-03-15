import { addError, addSuccess } from "../AddMessagetypToString";
import { getClient } from "../GetClient";
import { CreateEntry, Info } from "../interface";

async function setEntry(entry: CreateEntry): Promise<Info> {
  try {
    const client = await getClient();
    const todoExists = await client.exists(entry.todo);
    if (todoExists === 1) {
      return addError("To-Do exisitert bereits");
    } else {
      await client
        .multi()
        .hSet(entry.todo, [
          "Eigentümer",
          entry.owner,
          "Status",
          "progress",
          "Priorität",
          "1",
        ])
        .SADD("entries", entry.todo)
        .exec();
      return addSuccess("To-Do angelegt");
    }
  } catch (error) {
    console.error("Error:", error);
    return addError("Es ist ein Fehler aufgetreten");
  }
}

export default setEntry;
