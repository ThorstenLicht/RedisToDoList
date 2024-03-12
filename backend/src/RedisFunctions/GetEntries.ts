import { getClient } from "../GetClient";
import { Entry } from "../interface";

async function getEntries() {
  try {
    const client = await getClient();
    const entries: Array<Entry> = [];
    const todos = await client.SMEMBERS("entries");
    await Promise.all(
      todos.map(async (todo) => {
        const remainingTime = await client.TTL(todo);
        if (remainingTime === -2) {
          await client.SREM("entries", todo); //needed to clear the db from old entries
        } else {
          const hash = await client.HGETALL(todo);
          const entry: Entry = {
            todo: todo,
            owner: hash["Eigentümer"],
            status: hash["Status"],
            priority: hash["Priorität"],
            remainingTime: remainingTime,
          };
          entries.push(entry);
        }
      })
    );
    const send = {
      messagetyp: "entries",
      entries: entries,
    };

    return send;
  } catch (error) {
    console.error("Error:", error);
    return "Es ist ein Fehler aufgetreten";
  }
}

export default getEntries;
