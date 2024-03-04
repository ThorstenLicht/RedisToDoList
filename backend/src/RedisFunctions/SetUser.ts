import { getClient } from "../GetClient";
import { Request, Response } from "express";

async function setUser(req: Request, res: Response) {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const client = await getClient();
    const result = await client.set("user:" + username, password, {
      EX: 3600, //TTL 1 Stunde
      NX: true, //Eindeutiger Schlüssel
    });
    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Es ist ein Fehler aufgetreten");
  }
}

export default setUser;
