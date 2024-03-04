import { connections } from "..";
import setEntry from "../RedisFunctions/SetEntry";
import setStatus from "../RedisFunctions/SetStatus";
import setPriority from "../RedisFunctions/SetPriority";
import deletePriority from "../RedisFunctions/DeletePriority";
import getEntries from "../RedisFunctions/GetEntries";

function broadcast(message: any) {
  Object.keys(connections).forEach((username) => {
    const send = JSON.stringify(message);
    const connection = connections[username];
    connection.send(send);
  });
}

async function handleMessage(bytes: any, username: string) {
  const message = JSON.parse(bytes.toString());
  console.log(username, "send", message);
  const connection = connections[username];
  //New Entry
  if (message.messagetyp === "new") {
    const result = await setEntry(message.entry);
    const send = JSON.stringify(result);
    connection.send(send);
    if (result === "To-Do angelegt") {
      broadcast(message);
    }
  }
  //Status Change
  if (message.messagetyp === "status") {
    const result = await setStatus(message.entry, username);
    const send = JSON.stringify(result);
    connection.send(send);
    if (result === "To-Do verschoben") {
      broadcast(message);
    }
  }
  //Priority Change
  if (message.messagetyp === "priority") {
    const result = await setPriority(message.entry);
    const send = JSON.stringify(result);
    connection.send(send);
    if (result === "Priorität wurde geändert") {
      broadcast(message);
    }
  }
  //Priority Delete
  if (message.messagetyp === "deletePriority") {
    const result = await deletePriority(username);
    const send = JSON.stringify(result);
    connection.send(send);
    if (result === "Prioritäten zurückgesetzt") {
      const allEvents = await getEntries();
      broadcast(allEvents);
    }
  }
}

export default handleMessage;
