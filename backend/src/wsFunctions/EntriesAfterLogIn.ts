// import ws from "ws";
// import getEntries from "../RedisFunctions/GetEntries";
// import { addError } from "../AddMessagetypToString";

// async function entriesAfterLogIn(connection: ws) {
//   try {
//     const allEvents = await getEntries();
//     const send = JSON.stringify(allEvents);
//     connection.send(send);
//   } catch (error) {
//     console.error("Error:", error);
//     const send = JSON.stringify(addError("Es ist ein Fehler aufgetreten"));
//     connection.send(send);
//   }
// }

// export default entriesAfterLogIn;
