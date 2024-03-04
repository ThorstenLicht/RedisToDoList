import { getClient } from "../GetClient";
import { Request, Response } from "express";

async function changePassword(req: Request, res: Response) {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const client = await getClient();
    const result = await client.set("user:" + username, password);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Es ist ein Fehler aufgetreten");
  }
}

export default changePassword;
