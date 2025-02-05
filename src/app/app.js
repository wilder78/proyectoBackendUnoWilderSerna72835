// Import the express module. --//-- Importar el modulo de express.
import express from "express";

const app = express();
const port = 8080;

import path from "path";

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

// Accedamos desde el browser a: http://127.0.0.1:8080/home
app.get("/", (req, res) => {
  res.send("Hello World...! estoy en el home.");
});

// Accedamos desde el browser al llamado de los productos a: http://127.0.0.1:8080/products
app.get("/products", (req, res) => {
  console.log('Se accede a /products');
  const {title, category} = req.query;
  console.log('Titulo:',title);
  console.log('Categoria:',category);
  
  res.json({ products });
});

// Accedamos desde el browser al llamado por id a: http://127.0.0.1:8080/products/:idProd
app.get("/products/:idProd", (req, res) => {
  try {
    const { idProd: idString } = req.params;
    const idProd = Number(idString);

    if (isNaN(idProd)) throw new Error("Por favor coloque un número válido como id");

    const product = products.find((product) => product.idProd === idProd);

    res.json({
      product: product || "No se encontró el producto especificado.",
    });
  } catch (error) {
    res.status(400).json({
      errorMessage: error.message,
    });
  }
});

// Conexión al servidor localhost:8080.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

