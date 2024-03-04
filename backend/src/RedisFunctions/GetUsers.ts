import { getClient } from "../GetClient";
import { Response } from "express";

async function getUsers(res: Response) {
  try {
    const client = await getClient();
    const users = await client.keys("user:*");
    const cleanUsers = users.map((user) => user.replace(/^user:/, ""));
    res.status(200).json(cleanUsers);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Es ist ein Fehler aufgetreten");
  }
}

export default getUsers;
