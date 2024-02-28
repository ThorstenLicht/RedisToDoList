import express, { Request, Response } from "express";
import { getClient } from "../GetClient";

const controller = express.Router();
async function main() {
  try {
    const client = await getClient();
    const result = await client.set("test222", "value334");
    console.log("Value set successfully:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

controller.get("/test", (req: Request, res: Response) => {
  main();
  res.status(200).json("Done");
});

export default controller;
