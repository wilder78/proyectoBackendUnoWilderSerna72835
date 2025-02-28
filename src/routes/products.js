import { Router } from "express";
import { ProductModel } from "../models/products.model.js";

// import { isValidObjectId } from "mongoose";
// import { validateCreateUser } from "../middleware/validationMiddleware.js";
// import multer from "multer";
// import { multerUploaderMiddleware } from "../middleware/multer.js";

export const ProductsRouter = Router();

ProductsRouter.get("/", async (req, res, next) => {
  //get products
  try {
    const products = await ProductModel.find({});
    res.send({
      message: "Product found succesfully",
      data: products,
    });
  } catch (error) {
    error.message = `Error en la ruta GET /api/products.\n${error.message}`;
    next(error);
  }
});

ProductsRouter.post("/", async (req, res) => {
  try {
    console.log("Datos recibidos en el body:", req.body); // Verifica si llegan datos al servidor

    const { title, description, code, price, status, stock, category } =
      req.body;

    if (
      !title ||
      !description ||
      !code ||
      !price ||
      !status ||
      !stock ||
      !category
    ) {
      return res.status(400).send({
        message:
          "Fields title, description, code, price, status, stock, category are required",
      });
    }

    const productCreated = await ProductModel.create({
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
    });

    res.send({
      message: "Product created successfully.",
      data: productCreated,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error saving product", error: error.message });
  }
});
