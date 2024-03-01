import { getClient } from "../GetClient";
import { Request, Response } from "express";

async function testGet(req: Request, res: Response) {
  try {
    const client = await getClient();
    const result = await client.get("Jonas");
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
    return "";
  }
}

export default testGet;
