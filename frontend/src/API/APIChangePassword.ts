import { CustomToast } from "../CustomToast";
import { httpUrl } from "../GlobalURL";

async function APIChangePassword(username: string, password: string) {
  const Data = {
    username: username,
    password: password,
  };
  try {
    const request = await fetch(`${httpUrl}/user`, {
      method: "PUT",
      body: JSON.stringify(Data),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    const response = await request.json();
    if (request.ok) {
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

export default APIChangePassword;
