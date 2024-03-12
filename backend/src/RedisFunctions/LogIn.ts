import { getClient } from "../GetClient";
import { Request, Response } from "express";
import crypto from "crypto";

function generateToken() {
  return crypto.randomBytes(16).toString("hex");
}

async function logIn(req: Request, res: Response) {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const client = await getClient();
    const result = await client.get(username);
    if (password !== result || !result) {
      res.status(401).json("Passwort oder Benutzername falsch");
    } else {
      const TTL = await client.TTL(username);
      const existToken = await client.EXISTS("token:" + username);
      let token;
      if (existToken) {
        token = await client.get("token:" + username);
      } else {
        token = generateToken();
        await client.set("token:" + username, token, {
          EX: 86400, //TTL 1 Tag
          NX: true, //Eindeutiger Schlüssel
        });
      }
      const message = {
        token: token,
        status: "",
      };
      if (TTL >= 0) {
        message.status = "Passwort ändern";
      } else {
        message.status = "Erfolgreich angemeldet";
      }
      res.status(200).json(message);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Es ist ein Fehler aufgetreten");
  }
}

export default logIn;
