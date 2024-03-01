import express, { Request, Response } from "express";
import test from "../RedisFunctions/RedisFunctionsTest";
import testGet from "../RedisFunctions/RedisFunctionTest2";

const controller = express.Router();

controller.get("/test", (req: Request, res: Response) => {
  async function URLFunction(req: Request, res: Response) {
    await test();
    await testGet(req, res);
  }
  URLFunction(req, res);
});

export default controller;
