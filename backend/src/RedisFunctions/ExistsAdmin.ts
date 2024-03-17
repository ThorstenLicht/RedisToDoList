import { getClient } from "../GetClient";
import { Response } from "express";

async function existsAdmin(res: Response) {
  try {
    const client = await getClient();
    const adminExists = await client.exists("admin@admin.com");
    res.status(200).json({ adminExists: adminExists });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Es ist ein Fehler aufgetreten");
  }
}

export default existsAdmin;
