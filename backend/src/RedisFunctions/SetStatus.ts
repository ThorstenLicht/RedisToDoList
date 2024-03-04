import { getClient } from "../GetClient";
import { Status } from "../interface";

async function setStatus(status: Status, username: string): Promise<string> {
  try {
    const client = await getClient();
    const data = await client.HGETALL("entry:" + status.todo);
    if (data.Eigentümer !== username) {
      return "Sie sind nicht der Eigentümer";
    } else if (data.Status === status.status) {
      return "To-Do wurde nicht verschoben";
    } else {
      await client.HSET("entry:" + status.todo, "Status", status.status);
      if (status.status !== "progress") {
        await client.EXPIRE("entry:" + status.todo, 3600);
      } else {
        await client.PERSIST("entry:" + status.todo);
      }
      return "To-Do verschoben";
    }
  } catch (error) {
    console.error("Error:", error);
    return "Es ist ein Fehler aufgetreten";
  }
}

export default setStatus;
