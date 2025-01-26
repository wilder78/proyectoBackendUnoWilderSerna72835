// import { Router } from "express";

export const UsersRouter = Router();

UsersRouter.get("/", (req, res) => {
  //get users
  res.send({ message: "ok" });
});

UsersRouter.get("/:id", (req, res) => {
  //get users
  res.send({ message: { ...req.params } });
});
