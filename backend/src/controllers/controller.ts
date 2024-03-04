import express, { Request, Response } from "express";
import setUser from "../RedisFunctions/SetUser";
import changePassword from "../RedisFunctions/ChangePassword";
import logIn from "../RedisFunctions/LogIn";
import getUsers from "../RedisFunctions/GetUsers";
//import setEntry from "../RedisFunctions/SetEntry";
//import getEntries from "../RedisFunctions/getEntries";

const controller = express.Router();

controller.post("/user", (req: Request, res: Response) => {
  setUser(req, res);
});

controller.put("/user", (req: Request, res: Response) => {
  changePassword(req, res);
});

controller.post("/logIn", (req: Request, res: Response) => {
  logIn(req, res);
});

controller.get("/user", (req: Request, res: Response) => {
  getUsers(res);
});

/*
controller.post("/entry", (req: Request, res: Response) => {
  setEntry(req, res);
});

controller.get("/entry", (req: Request, res: Response) => {
  getEntries(res);
}); */

export default controller;
