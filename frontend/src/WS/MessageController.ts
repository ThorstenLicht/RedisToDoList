import { CustomToast } from "../CustomToast";
import { Entry } from "../interface";
import messagetypEntries from "./MessagetypEntries";
import messagetypNew from "./MessagetypNew";
import messagetypPriority from "./MessagetypPriority";
import messagetypStatus from "./MessagetypStatus";

function messageController(
  message: any,
  entries: Array<Entry>,
  setEntries: Function
) {
  switch (message.messagetyp) {
    case "info": {
      CustomToast.info(message.message);
      break;
    }
    case "error": {
      CustomToast.error(message.message);
      break;
    }
    case "success": {
      CustomToast.success(message.message);
      break;
    }
    case "entries": {
      messagetypEntries(message.entries, setEntries);
      break;
    }
    case "new": {
      messagetypNew(message.entry, entries, setEntries);
      break;
    }
    case "status": {
      messagetypStatus(message.entry, entries, setEntries);
      break;
    }
    case "priority": {
      messagetypPriority(message.entry, entries, setEntries);
      break;
    }
    case "deleteUser": {
      //TODO Erst ins Backend einbauen
      console.log(message);
      break;
    }
    default: {
      CustomToast.error("Unbekannter Nachrichtentyp");
    }
  }
}
export default messageController;
