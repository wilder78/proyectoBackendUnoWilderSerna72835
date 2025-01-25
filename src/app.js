// We import the express module. --//-- Importamos el modulo de express.
import { error } from "console";
import express, { response } from "express";
import path from "path";
import { send } from "process";

// We declare the variable "app" is an express application. --//-- Declaramos la variable "app" es una aplicacion de express.
const app = express();

// To work with JSON format and parse it correctly to object format.
// Para trabajar con formato JSON y se parseen correctamente a formato de objeto.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// We declare the port. --//-- Declaramos el puerto.
// const server = 8080;

// Definimos el objeto de tipo products con las props correspondientes, sin utilizar ts. solamente utilizando JSDocs.
/**
 * @typedef {Object} Products
 * @property {(number | string)} idProd
 * @property {string} nombre_comercial
 * @property {string} descripcion
 * @property {number} costo
 * @property {number} cantidad
 * @property {string} tipo_articulo
 */

/**
 *@type {Array<Products>}
 */

let products = [
  {
    idProd: 1,
    nombre_comercial: "Disco de freno Galfer Wave AKT 125 NKD",
    descripcion:
      "Disco de freno de alto desempeño con diseño Wave para AKT 125 NKD EIII.",
    costo: 120000,
    cantidad: 30,
    tipo_articulo: "repuesto",
  },
  {
    idProd: 2,
    nombre_comercial: "Disco de freno Brembo Yamaha NMAX",
    descripcion:
      "Disco de freno delantero original Brembo para Yamaha GPD155-A (NMAX155).",
    costo: 200000,
    cantidad: 15,
    tipo_articulo: "repuesto",
  },
  {
    idProd: 3,
    nombre_comercial: "Disco de freno TRW Suzuki GN 125",
    descripcion: "Disco de freno estándar para uso diario en Suzuki GN 125.",
    costo: 95000,
    cantidad: 25,
    tipo_articulo: "repuesto",
  },
  {
    idProd: 4,
    nombre_comercial: "Disco de freno ByBre Bajaj CT100",
    descripcion:
      "Repuesto delantero compatible con Bajaj CT100 KS Spoke. Ofrece excelente rendimiento.",
    costo: 85000,
    cantidad: 40,
    tipo_articulo: "repuesto",
  },
  {
    idProd: 5,
    nombre_comercial: "Disco de freno EBC Suzuki DR150",
    descripcion:
      "Disco de freno reforzado para motocicletas Suzuki DR150. Alta resistencia al desgaste.",
    costo: 180000,
    cantidad: 20,
    tipo_articulo: "repuesto",
  },
  {
    idProd: 6,
    nombre_comercial: "Kit de disco y mordazas Galfer AKT 125 NKD",
    descripcion:
      "Kit que incluye disco de freno delantero y mordazas de alta calidProdad para AKT 125 NKD.",
    costo: 150000,
    cantidad: 18,
    tipo_articulo: "accesorio",
  },
  {
    idProd: 7,
    nombre_comercial: "Disco ventilado NG Yamaha NMAX",
    descripcion:
      "Disco de freno ventilado de alto rendimiento para Yamaha NMAX, diseño avanzado.",
    costo: 220000,
    cantidad: 10,
    tipo_articulo: "repuesto",
  },
  {
    idProd: 8,
    nombre_comercial: "Disco deportivo TRW Suzuki GN 125",
    descripcion:
      "Disco con diseño deportivo y alto desempeño para Suzuki GN 125.",
    costo: 125000,
    cantidad: 12,
    tipo_articulo: "accesorio",
  },
  {
    idProd: 9,
    nombre_comercial: "Disco flotante RT Bajaj CT100",
    descripcion:
      "Disco de freno flotante diseñado para uso en Bajaj CT100. Mejora la capacidProdad de frenado.",
    costo: 105000,
    cantidad: 35,
    tipo_articulo: "accesorio",
  },
  {
    idProd: 10,
    nombre_comercial: "Disco trasero reforzado SBS Suzuki DR150",
    descripcion:
      "Repuesto trasero reforzado para motocicletas Suzuki DR150. Alta durabilidProdad.",
    costo: 140000,
    cantidad: 25,
    tipo_articulo: "repuesto",
  },
];

// Accedemos desde el browser a: http://127.0.0.1:8080
// el server nos responde.
app.get("/", (req, res) => {
  res.send("Welcome to my page...");
});


// Accedemos desde el browser a: http://127.0.0.1:8080/products
// el server nos responde con el llamado de los productos en formato json.
app.get("/products", (req, res) => {
  res.send({ data: products });
  // console.log(req.query)
  // const {costo} = req.query

  // console.log(costo)

  // res.send({ products });
});



// Accedemos desde el browser a: http://127.0.0.1:8080/idProd
// el server nos responde a la creacion de un nuevo producto.
// Method to query by id.--//--Metodo para consultar por id.
app.get("/products/:idProd", (req, res) => {
  const { idProd } = req.params; // Obtener idProd de los parámetros
  const product = products.find((product) => product.idProd === Number(idProd)); // Buscar producto con idProd

  // Validate if product is not found.--//--Validar si no se encuentra el producto.
  if (!product) {
    return res.status(404).send({ message: `Producto con id ${idProd} no encontrado` });
  }

  // Return the product found.--//--Retornar el producto encontrado.
  res.send({ data: product });
});


// Generate a product. --//-- Generar un producto.
app.post("/products", (req, res) => {
  /**
   * @type {Products}
   */
  const product = req.body;

  // Validacion de campos
  if (
    !product.nombre_comercial ||
    !product.descripcion ||
    !product.costo ||
    !product.cantidad ||
    !product.tipo_articulo
  ) {
    return res.status(400).send({
      message: "Error al crear producto",
      error: "Valores incompletos.",
    });
  }

  product.idProd = products.length + 1;

  products.push(req.body);

  return res.status(204).send({
    message: "Producto creado",
    data: { product },
  });
});


// Update a product.--//--Actualizar un producto.
app.put("/products/:idProd", (req, res) => {
  /**
   * @type {Products}
   */
  const { idProd } = req.params; // Obtener el id del producto desde los parámetros
  const dateProduct = req.body; // Obtener los datos a actualizar desde el cuerpo de la solicitud

  //   //TODO: agregar campos

  // Search for the product by its ProdID.--//--Buscar el producto por su idProd.
  const updateProduct = products.find((product) => product.idProd === Number(idProd));

  // Validate if the product does not exist.--//--Validar si el producto no existe.
  if (!updateProduct) {
    return res.status(400).send({ message: `Producto con id ${idProd} no encontrado` });
  }

  // Update the product array.--//--Actualizar el array de productos.
  products = products.map((product) => {
    if (product.idProd === Number(idProd)) {
      return { ...product, ...dateProduct }; // Conservar el idProd y actualizar otros campos
    }
    return product; // Mantener los productos que no coincidan sin cambios
  });

  // Reply with a success message.--//--Responder con un mensaje de éxito.
  res.status(200).send({ message: `El producto con id ${idProd} se actualizó correctamente.` });
});



// Connection to the port.--//--Conexion al puerto.
// We declare the port. --//-- Declaramos el puerto.
const server = app.listen(8080, () => {
  console.log(`The application is listening on the port ${8080}`);
});
