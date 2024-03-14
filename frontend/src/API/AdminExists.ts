import { httpUrl } from "../GlobalURL";
import { AdminExists } from "../interface";

async function APIExistsAdmin() {
  try {
    const request = await fetch(`${httpUrl}/admin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    const response: AdminExists = await request.json();

    if (response.adminExists === 1) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error("Fehler bei der API-Anfrage", error);
    return false;
  }
}

export default APIExistsAdmin;
