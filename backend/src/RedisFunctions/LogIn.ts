import { getClient } from "../GetClient";
import { Request, Response } from "express";

async function logIn(req: Request, res: Response) {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const client = await getClient();
    const result = await client.get("user:" + username);
    if (password !== result || !result) {
      res.status(401).json("Passwort oder Benutzername falsch");
    } else {
      const TTL = await client.TTL("user:" + username);
      if (TTL >= 0) {
        res.status(200).json("Passwort ändern");
      } else {
        res.status(200).json("Erfolgreich angemeldet");
      }
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Es ist ein Fehler aufgetreten");
  }
}

export default logIn;
