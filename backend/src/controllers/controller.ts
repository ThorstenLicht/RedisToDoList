import express, { Request, Response } from "express";
import changePassword from "../RedisFunctions/ChangePassword";
import logIn from "../RedisFunctions/LogIn";
import getUsers from "../RedisFunctions/GetUsers";
import setUser from "../RedisFunctions/SetUser";
import existsAdmin from "../RedisFunctions/ExistsAdmin";

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

controller.post("/user", async (req: Request, res: Response) => {
  const response = await setUser("Admin", "root", "Admin");
  if (response === "Nutzer wurde angelegt") {
    res.status(200).send("Admin wurde angelegt");
  } else {
    res.status(400).send(response.message);
  }
});

controller.get("/admin", (req: Request, res: Response) => {
  existsAdmin(res);
});

export default controller;
