import express from "express";
import path from "path";
import { config } from "../config/index.js";
import { ProductRouter } from "../routes/products.js";
import { logger } from "../middleware/index.js";

const initApp = () => {
  const app = express();

  //Para poder trabajar con JSON y que se parseen correctamente a formatos de objeto
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Ruta para mostrar vista por default
  app.use(express.static(path.join(config.dirname, "public")));

  // Autenticación con middleware.
  app.use(logger);

  // Enlace de exportación de las rutas.
  app.use('/api/products', ProductRouter);

  return app;
};

export default initApp;
