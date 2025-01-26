import express from "express";
import { productsRouter, cartsRouter } from "../routes/index.js";



const initApp = () => {
  const app = express();
  
  //Para poder trabajar con JSON y que se parseen correctamente a formatos de objeto
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  // =============================//=========================
  
  // Connection routes. --//-- Rutas de conexión.
  app.use('/api/product', productsRouter);
  app.use('/api/carts', cartsRouter);
  
  // =============================//=========================

  return app;
};

export default initApp;
