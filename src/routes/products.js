import { Router } from "express";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import { validateInputProducts } from "../middleware/validationMiddleware.js";

export const ProductRouter = Router();

// Definir la ruta correcta del archivo JSON
const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToProducts = join(__dirname, "../data/products.json");


// =============================== // =================================
//                    Accesos desde el metodo API.
// =============================== // =================================

// Accedamos desde el browser al llamado de los productos a: http://127.0.0.1:8080/api/products
ProductRouter.get("/", async (req, res) => {
  try {
    let productsString = await fs.promises.readFile(pathToProducts, "utf-8");
    const products = JSON.parse(productsString);
    res.send({ products });
  } catch (error) {
    res.status(500).send({ error: "Error al leer los productos" });
  }
});

// Accedamos desde el browser al registro de un nuevo producto a: http://127.0.0.1:8080/api/products.
ProductRouter.post("/", validateInputProducts, async (req, res) => {
  let productsString = await fs.promises.readFile(pathToProducts, "utf-8");
  const products = JSON.parse(productsString);

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
    idProd: uuidv4(),
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
  res.send({message: "Producto creado", data: product})
});
