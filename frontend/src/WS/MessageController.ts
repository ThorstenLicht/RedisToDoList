import { CustomToast } from "../CustomToast";
import { Entry } from "../interface";
import messagetypEntries from "./MessagetypEntries";

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
    case "entries": {
      messagetypEntries(message.entries, setEntries);
      break;
    }
    case "new": {
      console.log(message);
      break;
    }
    case "status": {
      console.log(message);
      break;
    }
    case "priority": {
      console.log(message);
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
