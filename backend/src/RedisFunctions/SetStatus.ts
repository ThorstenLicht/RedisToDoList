import { addError, addInfo, addSuccess } from "../AddMessagetypToString";
import { getClient } from "../GetClient";
import { Info, Status } from "../interface";

async function setStatus(status: Status, username: string): Promise<Info> {
  try {
    const client = await getClient();
    const data = await client.HGETALL("entry:" + status.todo);
    if (data.Eigentümer !== username) {
      return addError(`Sie haben keinen Eintrag ${status.todo}`);
    } else if (data.Status === status.status) {
      return addInfo("To-Do wurde nicht verschoben");
    } else {
      await client.HSET("entry:" + status.todo, "Status", status.status);
      if (status.status !== "progress") {
        await client.EXPIRE("entry:" + status.todo, 60);
      } else {
        await client.PERSIST("entry:" + status.todo);
      }
      return addSuccess("To-Do verschoben");
    }
  } catch (error) {
    console.error("Error:", error);
    return addError("Es ist ein Fehler aufgetreten");
  }
}

export default setStatus;
