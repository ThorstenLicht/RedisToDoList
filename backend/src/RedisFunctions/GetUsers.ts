import { getClient } from "../GetClient";
import { Response } from "express";
import { User } from "../interface";

async function getUsers(res: Response) {
  try {
    const client = await getClient();
    const users: Array<User> = [];
    const usernames = await client.SMEMBERS("usersToDo");
    await Promise.all(
      usernames.map(async (username) => {
        const remainingTime = await client.TTL(username);
        if (remainingTime === -2) {
          await client.SREM("usersToDo", username);
        } else {
          if (remainingTime >= 0) {
            const password = await client.GET(username);
            const user = {
              username: username,
              password: password,
              remainingTime: remainingTime,
            };
            users.push(user);
          } else {
            const user = {
              username: username,
              password: null,
              remainingTime: remainingTime,
            };
            users.push(user);
          }
        }
      })
    );
    res.status(200).json(users);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Es ist ein Fehler aufgetreten");
  }
}

export default getUsers;
