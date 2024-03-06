import { getClient } from "../GetClient";
import { Request, Response } from "express";
import crypto from "crypto";
import { tokenUserMap } from "..";

function generateToken() {
  return crypto.randomBytes(16).toString("hex");
}

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
      const message = {
        token: generateToken(),
        status: "",
      };
      tokenUserMap[username] = message.token;
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
