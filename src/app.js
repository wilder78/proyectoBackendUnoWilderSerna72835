// We import the express module. --//-- Importamos el modulo de express.
import express, { response } from "express";

// We declare the variable "app" is an express application. --//-- Declaramos la variable "app" es una aplicacion de express.
const app = express();

// We declare the port. --//-- Declaramos el puerto.
const port = 8080;

import path from "path";
import { send } from "process";

const products = [
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
  // console.log(req.query)
  const {costo} = req.query

  console.log(costo)
  
  res.send({ products });
});

// Accedemos desde el browser a: http://127.0.0.1:8080/saludo
// el server nos responde.
app.get("/products/:idProd", (req, res) => {
  try {
    // Esto es exactamente lo mismo que escribir "const idProd = req.params.idProd"
    const { idProd: idString } = req.params;

    const idProd = Number(idString);

    if (!idProd) throw new Error ('Por favor indique el id')

    const product = products.find((product) => product.idProd === idProd);

    res.send({ product: product || 'No se encontro el producto solicitado' });

  } catch (error) {
    response.status(400).send({
      errorMesage: error.message
    })
  }
});

// app.get("/products", (req, res) => {});

// Conexion al puerto
app.listen(port, () => {
  console.log(`The application is listening on the port ${port}`);
});
