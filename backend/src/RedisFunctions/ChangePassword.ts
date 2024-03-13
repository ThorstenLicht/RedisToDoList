import { connections } from "..";
import { getClient } from "../GetClient";
import { Request, Response } from "express";

async function changePassword(req: Request, res: Response) {
  try {
    const username = req.body.username;
    const oldPassword = req.body.oldPassword;
    const password = req.body.password;
    const client = await getClient();
    const currentPassword = await client.get(username);
    const firstTime = await client.TTL(username);
    if (currentPassword === oldPassword) {
      if (firstTime >= 0) {
        connections["Admin"].send(
          JSON.stringify({
            messagetyp: "changePasswordAdminInfo",
            username: username,
          })
        );
        await client.set(username, password);
        res.status(200).json("Passwort erfolgreich geändert");
      }
    } else {
      res.status(401).json("Das alte Passwort ist falsch");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Es ist ein Fehler aufgetreten");
  }
}

export default changePassword;
