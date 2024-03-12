import express, { Request, Response } from "express";
import changePassword from "../RedisFunctions/ChangePassword";
import logIn from "../RedisFunctions/LogIn";
import getUsers from "../RedisFunctions/GetUsers";

const controller = express.Router();

controller.put("/user", (req: Request, res: Response) => {
  changePassword(req, res);
});

controller.post("/logIn", (req: Request, res: Response) => {
  logIn(req, res);
});

controller.get("/user", (req: Request, res: Response) => {
  getUsers(res);
});

export default controller;
