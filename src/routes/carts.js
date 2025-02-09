import { Router } from "express";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import { validateInputCarts } from "../middleware/validationMiddleware.js";

export const CartsRouter = Router();

// Definir la ruta correcta del archivo JSON
const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToCarts = join(__dirname, "../data/carts.json");

// =============================== // =================================
//                    Accesos desde el metodo API.
// =============================== // =================================

// Accedamos desde el browser al llamado de los carts a: http://127.0.0.1:8080/api/carts
CartsRouter.get("/", async (req, res) => {
  try {
    let cartsString = await fs.promises.readFile(pathToCarts, "utf-8");
    const carts = JSON.parse(cartsString);
    res.send({ carts });
  } catch (error) {
    res.status(500).send({ error: "Error al leer el cart" });
  }
});



// Crear un nuevo carrito
CartsRouter.post("/", validateInputCarts, async (req, res) => {
  try {
    let cartsString = await fs.promises.readFile(pathToCarts, "utf-8");
    const carts = JSON.parse(cartsString);

    // 📌 Asegurar que req.body no esté vacío
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send({ error: "No se enviaron datos en la solicitud" });
    }

    const { products = [] } = req.body; // 📌 Un carrito almacena productos

    // 📌 Validar que `products` sea un array
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).send({ error: "El carrito debe contener al menos un producto" });
    }

    // Crear el nuevo carrito
    const cart = {
      idCart: uuidv4(),
      products, // 📌 Se espera un array de productos
    };

    carts.push(cart);

    // Guardar el archivo actualizado
    await fs.promises.writeFile(pathToCarts, JSON.stringify(carts, null, 2));

    res.status(201).send({ message: "Carrito creado", data: cart });
  } catch (error) {
    console.error("Error al registrar el carrito:", error);
    res.status(500).send({ error: "Error al registrar el carrito" });
  }
});

  