import { CustomToast } from "../CustomToast";
import { httpUrl } from "../GlobalURL";

async function APILogIn(username: string, password: string) {
  const LogInData = {
    username: username,
    password: password,
  };
  console.log(JSON.stringify(LogInData));
  try {
    const request = await fetch(`${httpUrl}/logIn`, {
      method: "POST",
      body: JSON.stringify(LogInData),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    const response = await request.json();
    console.log(response);
    if (request.ok) {
      return true;
    } else {
      CustomToast.error(response);
      return false;
    }
  } catch (error) {
    console.error("Fehler bei der API-Anfrage", error);
    CustomToast.error("Server nicht erreichbar");
    return false;
  }
}

export default APILogIn;
