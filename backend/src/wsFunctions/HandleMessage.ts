import { connections } from "..";
import setEntry from "../RedisFunctions/SetEntry";
import setStatus from "../RedisFunctions/SetStatus";
import setPriority from "../RedisFunctions/SetPriority";
import deletePriority from "../RedisFunctions/DeletePriority";
import getEntries from "../RedisFunctions/GetEntries";
import addMessagetypToString from "../AddMessagetypToString";

function broadcast(message: any) {
  Object.keys(connections).forEach((username) => {
    const send = JSON.stringify(message);
    const connection = connections[username];
    connection.send(send);
  });
}

async function handleMessage(bytes: any, username: string) {
  try {
    const message = JSON.parse(bytes.toString());
    console.log(username, "send", message);
    const connection = connections[username];
    switch (message.messagetyp) {
      case "new": //new entry
        const resultNew = await setEntry(message.entry);
        const sendNew = JSON.stringify(resultNew);
        connection.send(sendNew);
        if (resultNew.message === "To-Do angelegt") {
          broadcast(message);
        }
        break;
      case "status": //change status
        const resultStatus = await setStatus(message.entry, username);
        const sendStatus = JSON.stringify(resultStatus);
        connection.send(sendStatus);
        if (resultStatus.message === "To-Do verschoben") {
          broadcast(message);
        }
        break;
      case "priority": //change priority
        const resultPriority = await setPriority(message.entry);
        const sendPriority = JSON.stringify(resultPriority);
        connection.send(sendPriority);
        if (resultPriority.message === "Priorität wurde geändert") {
          broadcast(message);
        }
        break;
      case "deletePriority": //delete priority
        const resultDeletePriority = await deletePriority(username);
        const sendDeletePriority = JSON.stringify(resultDeletePriority);
        connection.send(sendDeletePriority);
        if (resultDeletePriority.message === "Prioritäten zurückgesetzt") {
          const allEvents = await getEntries();
          broadcast(allEvents);
        }
        break;
      default:
        const senddefault = JSON.stringify(
          addMessagetypToString("Fehlerhafte Anfrage")
        );
        connection.send(senddefault);
        break;
    }
  } catch (error) {
    console.error("Error:", error);
    const connection = connections[username];
    const send = JSON.stringify(addMessagetypToString("Fehlerhafte Anfrage"));
    connection.send(send);
  }
}

export default handleMessage;
