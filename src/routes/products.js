import { Router } from "express";
import { multerUploaderMiddleware } from "../middlewares/index.js";

export const productsRouter = Router();

const products = [
  {
    "id": 1,
    "nombre_comercial": "Carburador Keihin PWK",
    "descripcion": "Carburador de alto rendimiento compatible con motos de 150cc a 200cc.",
    "costo": 150000,
    "cantidad": 20,
    "tipo_articulo": "repuesto"
  },
  {
    "id": 2,
    "nombre_comercial": "Carburador Mikuni VM22",
    "descripcion": "Ideal para motos deportivas de 125cc a 200cc. Ofrece excelente respuesta al acelerador.",
    "costo": 180000,
    "cantidad": 15,
    "tipo_articulo": "repuesto"
  },
  {
    "id": 3,
    "nombre_comercial": "Carburador PZ27",
    "descripcion": "Compatible con motos de 150cc, especialmente modelos de trabajo.",
    "costo": 130000,
    "cantidad": 25,
    "tipo_articulo": "repuesto"
  },
  {
    "id": 4,
    "nombre_comercial": "Carburador CG150",
    "descripcion": "Diseñado para motores CG150, reconocido por su durabilidad.",
    "costo": 110000,
    "cantidad": 30,
    "tipo_articulo": "repuesto"
  },
  {
    "id": 5,
    "nombre_comercial": "Carburador NIBBI Racing PE24",
    "descripcion": "Carburador de alto rendimiento para motos de hasta 200cc. Ideal para modificaciones.",
    "costo": 250000,
    "cantidad": 10,
    "tipo_articulo": "repuesto"
  },
  {
    "id": 6,
    "nombre_comercial": "Carburador PZ19",
    "descripcion": "Carburador estándar para motos de 100cc a 125cc. Fácil de instalar.",
    "costo": 90000,
    "cantidad": 40,
    "tipo_articulo": "repuesto"
  },
  {
    "id": 7,
    "nombre_comercial": "Carburador VM24 Mikuni",
    "descripcion": "Carburador adaptable para motos entre 125cc y 150cc. Proporciona rendimiento confiable.",
    "costo": 170000,
    "cantidad": 18,
    "tipo_articulo": "repuesto"
  },
  {
    "id": 8,
    "nombre_comercial": "Carburador CVK26",
    "descripcion": "Compatible con motos de turismo de 150cc a 200cc. Estabilidad garantizada.",
    "costo": 200000,
    "cantidad": 12,
    "tipo_articulo": "repuesto"
  },
  {
    "id": 9,
    "nombre_comercial": "Carburador PWK28",
    "descripcion": "Carburador para motocicletas de alto cilindraje dentro del rango de 180cc a 200cc.",
    "costo": 280000,
    "cantidad": 8,
    "tipo_articulo": "repuesto"
  },
  {
    "id": 10,
    "nombre_comercial": "Carburador Honda Wave 110",
    "descripcion": "Carburador OEM para motocicletas Honda Wave de 100cc a 110cc.",
    "costo": 120000,
    "cantidad": 35,
    "tipo_articulo": "repuesto"
  }
];

// ==================================== // ==================================

productsRouter.get("/", (req, res) => {
  //get products
  res.send({ message: "Productos", data: products });
});

/* productsRouter.post('/', multerUploaderMiddleware.single('gatito'), (req, res) => {
  console.log(req.file)
  res.send({ message: 'Gatito uploaded' })
}) */

  productsRouter.post(
  "/",
  multerUploaderMiddleware.fields([
    { name: "product1", maxCount: 1 },
    { name: "product2", maxCount: 1 },
  ]),

  (req, res) => {

    // console.log(req.file);
    
    // console.log(req.files);
    

    const product = req.body;

    if (!product.nombre_comercial || !product.descripcion || !product.costo || 
        !product.cantidad || !product.tipo_articulo) {
      return res.status(400).send({
        message: "Error al crear un producto",
        error: "Valores incompletos",
      });
    }
    product.idProd = products.length + 1;

    products.push(product);

    return res.status(200).send({
      message: 'Producto creado',
      data: { ...product },
    })

    // console.log(req.files);
    // for (const file of req.files) {
    //   //Logic here
    // }
    // res.send({ message: "Producto uploaded" });
  }
);

//Handling multiple files
/* const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
}) */
