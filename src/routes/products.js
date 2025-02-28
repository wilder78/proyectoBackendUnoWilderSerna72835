import { Router } from "express";
import { ProductModel } from "../models/products.model.js";

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

ProductsRouter.put("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { title, description, code, price, status, stock, category } =
      req.body;

    // Verificar que el ID es válido (si se usa MongoDB, por ejemplo)
    if (!_id) {
      return res.status(400).send({ message: "Product ID is required" });
    }

    // Verificar que al menos un campo se está actualizando
    if (
      !title &&
      !description &&
      !code &&
      !price &&
      !status &&
      !stock &&
      !category
    ) {
      return res.status(400).send({
        message:
          "Se requiere al menos un campo (titulo, descripcion, codigo, precio, stado, cantida o categoria) para la actualización",
      });
    }

    // Intentar actualizar el producto
    const productUpdated = await ProductModel.findByIdAndUpdate(
      _id, // ID del producto
      { title, description, code, price, status, stock, category }, // Datos a actualizar
      { new: true, runValidators: true } // Retorna el nuevo documento y valida los datos
    );

    // Si el producto no fue encontrado
    if (!productUpdated) {
      return res.status(404).send({ message: "Producto no encontrado" });
    }

    res.status(200).send({
      message: "Producto actualizado con éxito",
      data: productUpdated,
    });
  } catch (error) {
    error.message = `Error in PUT /api/products/${req.params.id}.\n${error.message}`;
    next(error);
  }
});

ProductsRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // Verificar que el ID fue proporcionado
    if (!id) {
      return res.status(400).send({ message: "User ID is required" });
    }

    // Intentar eliminar el producto por ID
    const productDeleted = await ProductModel.findByIdAndDelete(id);

    // Si el product no fue encontrado
    if (!productDeleted) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send({
      message: "User deleted successfully",
      data: productDeleted, // Devuelve el producto eliminado si es necesario
    });
  } catch (error) {
    error.message = `Error in DELETE /api/users/${req.params.id}.\n${error.message}`;
    next(error);
  }
});
