import { CustomToast } from "../CustomToast";
import { httpUrl } from "../GlobalURL";
import { User } from "../interface";

async function APIGetUsers() {
  try {
    const request = await fetch(`${httpUrl}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    const response: Array<User> = await request.json();
    if (request.ok) {
      return response;
    } else {
      CustomToast.error("ERROR");
      return null;
    }
  } catch (error) {
    console.error("Fehler bei der API-Anfrage", error);
    CustomToast.error("Server nicht erreichbar");
    return null;
  }
}

export default APIGetUsers;
