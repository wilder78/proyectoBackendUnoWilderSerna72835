import { Router } from "express";
import fs from "fs/promises";
import path from "path";
import { config } from "../config/index.js";

export const ViewsRouter = Router();

// Función para obtener usuarios con manejo de errores
const getUsers = async () => {
  try {
    const filePath = path.join(config.dirname, "src/data/users.json");
    const usersString = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(usersString);
    
    if (!Array.isArray(users) || users.length === 0) {
      throw new Error("No users found");
    }

    return users;
  } catch (error) {
    console.error("Error loading users:", error);
    return null;
  }
};

ViewsRouter.get("/", (req, res) => {
  res.render("home", { title: "MMS-Repuestos", name: "Master" });
});


ViewsRouter.get("/random-user", async (req, res) => {
  // console.log({users});
  const users = await getUsers();
  if (!users) {
    return res.status(500).send("Error loading users");
  }

  const randomUser = users[Math.floor(Math.random() * users.length)];
  res.render("random-user", { user: randomUser });
});

// Llamado al listado de usuarios
ViewsRouter.get("/users", async (req, res) => {
  const users = await getUsers();
  if (!users) {
    return res.status(500).send("Error loading users");
  }

  res.render("users", {
    user: { nombres: "Mauricio", isAdmin: true },
    userList: users,
  });
});
