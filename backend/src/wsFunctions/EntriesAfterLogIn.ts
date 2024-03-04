import ws from "ws";
import getEntries from "../RedisFunctions/GetEntries";

async function entriesAfterLogIn(connection: ws) {
  try {
    const allEvents = await getEntries();
    const send = JSON.stringify(allEvents);
    connection.send(send);
  } catch (error) {
    console.error("Error:", error);
    connection.send("Es ist ein Fehler aufgetreten");
  }
}

export default entriesAfterLogIn;
