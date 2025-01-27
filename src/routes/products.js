import { Router } from "express";
import fs from "fs";
import path from "path";
import { config } from "../config/index.js";
import { v4 as uuidv4 } from "uuid";
import { validateInputProducts } from "../middlewares/index.js";




export const productsRouter = Router();

const pathToProducts = path.join(config.dirname, "./src/data/products.json");

console.log(pathToProducts);

// ==================================== // ==================================

productsRouter.get("/", async (req, res) => {
  let productsString = await fs.promises.readFile(pathToProducts, "utf-8");
  const products = JSON.parse(productsString);
  res.send({ products });
});

// ==================================== // ==================================

productsRouter.post("/", validateInputProducts, async (req, res) => {
  // decodificación para el llamado del producto.
  let productsString = await fs.promises.readFile(pathToProducts, "utf-8");
  const products = JSON.parse(productsString);

  const idPrd = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;

  const product = {
    // idProd autogenerado
    idPrd,
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  };

  products.push(product);

  const productsStringified = JSON.stringify(products, null, "\t");
  await fs.promises.writeFile(pathToProducts, productsStringified);
  res.send({ message: "Producto creado.", data: product });
});
