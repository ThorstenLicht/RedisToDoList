import { deleteCookie } from "../CookieFunctions";
import { CustomToast } from "../CustomToast";

function messagetypDeleteUser(username: string) {
  sessionStorage.clear();
  deleteCookie(`username${username}`);
  deleteCookie(`token${username}`);
  CustomToast.info("Ihr Benutzer wurde gelöscht");
}
export default messagetypDeleteUser;
