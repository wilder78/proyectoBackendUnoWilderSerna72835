import express from "express";
import { ProductsRouter, UsersRouter } from "../routes/indexRoutes.js";
import { config } from "../config/indexConfig.js";
import { logger } from "../middleware/logger.js";

import errorHandler from "../middleware/errorHandling.js";

const initApp = () => {
  const app = express();

  //Para poder trabajar con JSON y que se parseen correctamente a formatos de objeto
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(express.static(config.dirname + "public"));

  //Middleware logging
  app.use(logger);

  //Router para API (arranca con /api)
  app.use("/api/users", UsersRouter);
  app.use("/api/products", ProductsRouter);
  app.use(errorHandler);

  return app;
  S;
};

export default initApp;
