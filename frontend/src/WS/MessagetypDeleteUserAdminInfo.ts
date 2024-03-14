import { CustomToast } from "../CustomToast";
import { User } from "../interface";

function messagetypDeleteUserAdminInfo(
  info: string,
  users: Array<User>,
  setUsers: Function,
  username: string
) {
  if (info === "Benutzer gelöscht") {
    const updatedUsers = users.filter((user) => user.username !== username);
    setUsers(updatedUsers);
    CustomToast.success(info);
  } else {
    CustomToast.error(info);
  }
}
export default messagetypDeleteUserAdminInfo;
