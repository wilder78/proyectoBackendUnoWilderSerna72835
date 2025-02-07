import { Router } from "express";
import { multerUploaderMiddleware } from "../middleware/index.js";

export const ProductRouter = Router();

const products = [
  {
    idProd: 1,
    title: "Disco de freno Galfer Wave AKT 125 NKD",
    description:
      "Disco de freno de alto desempeño con diseño Wave para AKT 125 NKD EIII.",
    code: "ms-01",
    price: 120000,
    status: true,
    stock: 30,
    category: "repuesto",
    thumbnails: [],
  },
  {
    idProd: 2,
    title: "Disco de freno Brembo Yamaha NMAX",
    description:
      "Disco de freno delantero original Brembo para Yamaha GPD155-A (NMAX155).",
    code: "ms-02",
    price: 200000,
    status: true,
    stock: 15,
    category: "repuesto",
    thumbnails: [],
  },
];

// =============================== // =================================
//                    Accesos desde el metodo API.
// =============================== // =================================


// Accedamos desde el browser al llamado de los productos a: http://127.0.0.1:8080/api/products
ProductRouter.get("/", (req, res) => {
  res.send({ message: "Productos", data: products });
});


// Accedamos desde el browser al registro de un nuevo producto a: http://127.0.0.1:8080/api/products.
ProductRouter.post(
  "/",
  multerUploaderMiddleware.fields([
    { name: "producto1", maxCount: 1 },
    { name: "producto2", maxCount: 1 },
  ]),
  (req, res) => {

    console.log(req.file);

    console.log(req.files);

    const product = req.body;

    if (
      !product.title ||
      !product.description ||
      !product.code ||
      !product.price ||
      !product.status ||
      !product.stock ||
      !product.category ||
      !product.thumbnails
    ) {
      return res.status(400).send({
        message: "Error al crear el producto",
        error: "Datos incompletos",
      });
    }

    product.idProd = products.length + 1;

    products.push(product);

    return res.status(204).send({
      message: "Producto registrado.",
      data: { product },
    });
  }
);

