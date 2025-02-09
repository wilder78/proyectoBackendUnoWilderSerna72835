import express from "express";
import path from "path";
import { config } from "../config/index.js";
import { ProductRouter, CartsRouter } from "../routes/index.js";
import { validateInputHome } from "../middleware/validationMiddleware.js";


const initApp = () => {
  const app = express();

  //Para poder trabajar con JSON y que se parseen correctamente a formatos de objeto
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Route to display view by default. --//-- Ruta para mostrar vista por por defecto.
  app.use(express.static(path.join(config.dirname, "public")));

  // Authentication with middleware. --//-- Autenticación con el software intermedio.
  app.use(validateInputHome);

  // Export links for routes. --//-- Enlaces de exportación de las rutas.
  app.use('/api/products', ProductRouter);
  app.use('/api/carts', CartsRouter)

  return app;
};

export default initApp;
