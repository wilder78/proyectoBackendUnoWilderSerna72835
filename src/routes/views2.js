import { Router } from "express";
import fs from "fs";
import { config } from "../config/index.js";

export const ViewsRouter = Router();

ViewsRouter.get("/", (req, res) => {
  const options = {
    title: "MMS-Repuestos",
    name: "Master",
  };
  res.render("home", options);
});


ViewsRouter.get("/random-user", async (req, res) => {
  let usersString = await fs.promises.readFile(
    config.dirname + "/src/data/users.json",
    "utf-8"
  );
  const users = JSON.parse(usersString);
  const randomIndex = Math.floor(Math.random() * users.length);
  const randomUser = users[randomIndex];
  res.render("random-user", randomUser);
});


ViewsRouter.get("/users", async (req, res) => {
  let usersString = await fs.promises.readFile(
    config.dirname + "/src/data/users.json",
    "utf-8"
  );
  const users = JSON.parse(usersString);

  const options = {
    user: {
      nombres: "Mauricio",
      isAdmin: true,
    },
    userList: users,
  };
  res.render("users", options);
});
