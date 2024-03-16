import { connections } from "..";
import setEntry from "../RedisFunctions/SetEntry";
import setStatus from "../RedisFunctions/SetStatus";
import setPriority from "../RedisFunctions/SetPriority";
import deletePriority from "../RedisFunctions/DeletePriority";
import getEntries from "../RedisFunctions/GetEntries";
import logOut from "../RedisFunctions/LogOut";
import { addError } from "../AddMessagetypToString";
import setUser from "../RedisFunctions/SetUser";
import deleteUser from "../RedisFunctions/DeleteUser";
import reset from "../RedisFunctions/Reset";
import updateTitle from "../RedisFunctions/UpdateTitle";
import deleteEntry from "../RedisFunctions/DeleteEntry";

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
      case "logOut": //log out
        const resultLogOut = await logOut(username);
        const sendLogOut = JSON.stringify(resultLogOut);
        connection.send(sendLogOut);
        connection.close();
        break;
      case "getEntries": //get Entries
        const resultGetEntries = await getEntries();
        const sendGetEntries = JSON.stringify(resultGetEntries);
        connection.send(sendGetEntries);
        break;

      case "setUser": //new User
        const resultSetUser = await setUser(
          message.logInData.username,
          message.logInData.password,
          username
        );
        const sendSetUser = JSON.stringify(resultSetUser);
        if (resultSetUser === "Nutzer wurde angelegt") {
          connection.send(JSON.stringify(message));
        } else {
          connection.send(sendSetUser);
        }
        break;
      case "updateTitle": //update Title
        const resultUpdateTitle = await updateTitle(
          message.newTitle,
          message.oldTitle,
          username
        );
        const sendUpdateTitle = JSON.stringify(resultUpdateTitle);
        if (resultUpdateTitle.message === "Eintrag wurde geupdated") {
          connection.send(sendUpdateTitle);
          broadcast(message);
        } else {
          connection.send(sendUpdateTitle);
        }
        break;
      case "deleteEntry": //delete entry
        const resultdeleteEntry = await deleteEntry(message.title, username);
        const senddeleteEntry = JSON.stringify(resultdeleteEntry);
        if (resultdeleteEntry.message === "Eintrag wurde gelöscht") {
          connection.send(senddeleteEntry);
          broadcast(message);
        } else {
          connection.send(senddeleteEntry);
        }
        break;
      case "deleteUser": //delete User
        const resultDeleteUser = await deleteUser(message.username, username);
        const sendDelteUser = JSON.stringify(resultDeleteUser);
        connection.send(sendDelteUser);
        if (
          resultDeleteUser.message === "Benutzer gelöscht" &&
          connections[message.username]
        ) {
          const deadConnection = connections[message.username];
          const sendDeadConnection = message;
          deadConnection.send(JSON.stringify(sendDeadConnection));
          deadConnection.close();
        }
        break;
      case "reset": //reset database with all entries and user
        const resultReset = await reset(username);
        const sendReset = JSON.stringify(resultReset);
        if (
          resultReset.message ===
          "To-Do Liste inklusive Benutzer wurde vom Admin gelöscht"
        ) {
          Object.keys(connections).forEach((username) => {
            const connection = connections[username];
            connection.send(sendReset);
            connection.close();
          });
        } else {
          connection.send(sendReset);
        }
        break;
      default:
        const senddefault = JSON.stringify(
          addError("Unbekannter Nachrichtentyp")
        );
        connection.send(senddefault);
        break;
    }
  } catch (error) {
    console.error("Error:", error);
    const connection = connections[username];
    const send = JSON.stringify(addError("Fehlerhafte Anfrage"));
    connection.send(send);
  }
}

export default handleMessage;
