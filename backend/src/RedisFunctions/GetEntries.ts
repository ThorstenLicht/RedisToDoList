import { getClient } from "../GetClient";
import { Entry } from "../interface";

async function getEntries() {
  try {
    const client = await getClient();
    const entries: Array<Entry> = [];
    const keys = await client.keys("entry:*");
    await Promise.all(
      keys.map(async (key) => {
        const hash = await client.HGETALL(key);
        const todo = key.split(":")[1]; // clean todo
        const entry: Entry = {
          todo: todo,
          owner: hash["Eigentümer"],
          status: hash["Status"],
          priority: hash["Priorität"],
          remainingTime: await client.TTL(key),
        };
        entries.push(entry);
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
