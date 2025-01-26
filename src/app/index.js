import express from "express";
import { productsRouter } from "../routes/index.js";
import { config } from "../config/index.js";
import { logger } from "../middlewares/index.js";

const initApp = () => {
  const app = express();
  
  //Para poder trabajar con JSON y que se parseen correctamente a formatos de objeto
  app.use(express.json());
  app.use(express.urlencoded());
  
  // Connection routes. --//-- Rutas de conexión.
  app.use("/", express.static(config.dirname ));
  app.use('/api/products', productsRouter);
  
  // Middleware routes. --//-- Rutas del middlewares.
  app.use(logger);
  
  /**
   * @typedef {Object} Product
   * @property {string} idProd
   * @property {string} nombre_comercial
   * @property {string} descripcion
   * @property {number} costo
   * @property {number} cantidad
   * @property {string} tipo_articulo
   */

  const products = [];

  app.post("/api/product", (req, res) => {
    /**
     * @type {Product}
     */
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

    // res.status(304).redirect("/virtual");
  });


  // =============================//=========================


  const middlewareHome = (req, res, next) => {
    req.mensajeBienvenida = "Bienvenido al home producto!";
    next();
  };

  app.get("/api/home", middlewareHome, (req, res) => {
    res.status(200).send({ message: req.mensajeBienvenida });
  });


  // app.use('/api/users', UsersRouter);

  // app.use(express.static('./'));
  // app.use("/", express.static(config.dirname + "public"));

  // app.use('/pets', PetsRouter)

  // app.use('/virtual', express.static('public'))


  return app;
};

export default initApp;
