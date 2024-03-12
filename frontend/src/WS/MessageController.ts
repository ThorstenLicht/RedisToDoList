import { CustomToast } from "../CustomToast";
import { Entry, User } from "../interface";
import changePasswordAdminInfo from "./ChangePasswordAdminInfo";
import messagetypDeleteUserAdminInfo from "./MessagetypDeleteUserAdminInfo";
import messagetypDeleteUser from "./MessagetypDelteUser";
import messagetypEntries from "./MessagetypEntries";
import messagetypNew from "./MessagetypNew";
import messagetypPriority from "./MessagetypPriority";
import messagetypSetUser from "./MessagetypSetUser";
import messagetypStatus from "./MessagetypStatus";

function messageController(
  message: any,
  entries: Array<Entry>,
  setEntries: Function,
  setUsers: Function,
  users: Array<User>
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
    case "setUser": {
      messagetypSetUser(message.logInData, setUsers, users);
      break;
    }
    case "deleteUser": {
      messagetypDeleteUser(message.username);
      break;
    }
    case "deleteUserAdminInfo": {
      messagetypDeleteUserAdminInfo(
        message.message,
        users,
        setUsers,
        message.username
      );
      break;
    }
    case "changePasswordAdminInfo": {
      changePasswordAdminInfo(users, setUsers, message.username);
      break;
    }
    default: {
      CustomToast.error("Unbekannter Nachrichtentyp");
    }
  }
}
export default messageController;
