import { CustomToast } from "../CustomToast";
import { httpUrl } from "../GlobalURL";

async function APICreateAdmin() {
  try {
    const request = await fetch(`${httpUrl}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    const response = await request.text();

    if (response === "Admin wurde angelegt") {
      return response;
    } else {
      CustomToast.error(response);
      return null;
    }
  } catch (error) {
    console.error("Fehler bei der API-Anfrage", error);
    CustomToast.error("Server nicht erreichbar");
    return null;
  }
}

export default APICreateAdmin;
