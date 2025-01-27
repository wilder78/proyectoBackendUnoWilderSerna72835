import { Router } from "express";
import fs from 'fs';
import path from "path";
import { config } from "../config/index.js";
import { v4 as uuidv4 } from "uuid";
import { validateInputCarts } from "../middlewares/index.js";


export const cartsRouter = Router();

const pathToCarts = path.join(config.dirname, "./src/data/carts.json");

console.log(pathToCarts);

// ==================================== // ==================================

cartsRouter.get("/", async (req, res) => {
  let cartsString = await fs.promises.readFile(pathToCarts, "utf-8");
  const carts = JSON.parse(cartsString);
  res.send({ carts });
}); 

// ==================================== // ==================================

cartsRouter.post('/', validateInputCarts, async (req, res) => {
  let cartsString = await fs.promises.readFile(pathToCarts, "utf-8");
  const carts = JSON.parse(cartsString);

  const idCart = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

  const {
    title,
    amount,
    price
  } = req.body;

  const cart = {
    // id autogenerado
    idCart,
    title,
    amount,
    price
  };

  carts.push(cart);

  const cartsStringfied = JSON.stringify(carts, null, "\t");
  await fs.promises.writeFile(pathToCarts, cartsStringfied);
  res.send({ message: "Carrito creado.", data: cart });
});