// Import the express module. --//-- Importar el modulo de express.
import express from "express";

const app = express();
const port = 8080;

//Para poder trabajar con JSON y que se parseen correctamente a formatos de objeto
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let products = [
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

//Definimos el Objeto de tipo Gatito con las props correspondientes, sin utilizar ts. Solamente utilizando JSDocs
/**
 * @typedef {object} Product
 * @property {string} title
 * @property {string} description
 * @property {string} code
 * @property {number} price
 * @property {string} status
 * @property {number} stock
 * @property {string} category
 * @property {string} thumbnails
 * @property {(string | number)} idProd
 */

// Accedamos desde el browser a: http://127.0.0.1:8080/home
app.get("/", (req, res) => {
  res.send("Hello World...! estoy en el home.");
});

// Accedamos desde el browser al llamado de los productos a: http://127.0.0.1:8080/products
app.get("/products", (req, res) => {
  res.status(200).send({ data: products });
});

// Accedamos desde el browser al llamado por id a: http://127.0.0.1:8080/products/:idProd
app.get("/products/:idProd", (req, res) => {
  try {
    const { idProd: idString } = req.params;
    const idProd = Number(idString);

    if (isNaN(idProd))
      throw new Error("Por favor coloque un número válido como id");

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

// ============================= // =================================
// Accesos desde el metodo API.
// ============================= // =================================

// Accedamos desde el browser al llamado de los productos a: http://127.0.0.1:8080/api/products
app.get("/api/products", (req, res) => {
  res.status(200).send({ data: products });
});

// Accedamos desde el browser al registro de un nuevo producto a: http://127.0.0.1:8080/api/products.
app.post("/api/products", (req, res) => {
  /**
   * @type {Product}
   */
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
});

// Accedemos desde el browser al llamado por id en: http://127.0.0.1:8080/api/products/:idProd
app.get("/api/products/:idProd", (req, res) => {
  try {
    const { idProd: idString } = req.params;
    const idProd = parseInt(idString, 10); // Conversión más clara

    if (isNaN(idProd)) {
      return res
        .status(400)
        .json({ message: "Por favor coloque un número válido como ID" });
    }

    const product = products.find((product) => product.idProd === idProd);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json({ product }); // Código 200 explícito
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: "Error en el servidor", details: error.message });
  }
});

// Accedemos desde el browser para actualizar un producto en: http://127.0.0.1:8080/api/products/:id
app.put("/api/products/:idProd", (req, res) => {
  const { idProd } = req.params;
  const updatedData = req.body;

  // Buscar el índice del producto en el array
  const productIndex = products.findIndex(product => product.idProd === Number(idProd));

  if (productIndex === -1) {
    return res.status(404).json({ message: `No se encontró el producto con el ID: ${idProd}` });
  }

  // Validación de datos entrantes
  if (!updatedData.title || !updatedData.description || !updatedData.code || 
      typeof updatedData.price !== "number" || typeof updatedData.status !== "boolean" ||
      typeof updatedData.stock !== "number" || !updatedData.category || !Array.isArray(updatedData.thumbnails)) {
    return res.status(400).json({ message: "Error: Datos incompletos o incorrectos para la actualización." });
  }

  // Mantener los valores previos si no se pasan en updatedData
  products[productIndex] = { ...products[productIndex], ...updatedData };

  res.status(200).json({ message: `Producto con ID ${idProd} actualizado correctamente.`, data: products[productIndex] });
});

// conexion al servidor.
const server = app.listen(8080, () => {
  console.info("Server listen on port 8080");
});
