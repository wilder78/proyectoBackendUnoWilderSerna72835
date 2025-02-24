import { Router } from "express";
import { UserModel } from "../models/user.model.js";
import { isValidObjectId } from "mongoose";

export const UsersRouter = Router();

UsersRouter.get("/", async (req, res, next) => {
  //get users
  try {
    const users = await UserModel.find({})
    res.send({ 
      message: 'User found succesfully', 
      data: users
    })
  } catch (error) {
    error.message = `Error en la ruta GET /api/users.\n${error.message}`
    next(error)
  }
});

UsersRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const isValid = isValidObjectId(id);
    if (!isValid) res.status(400).send({ message: "Wrong object id." });
    else {
      const userFound = await UserModel.findById(id);
      if (!userFound) res.status(404).send({ message: "User not found" });
      else {
        res.send({
          message: "User found succesfully",
          data: userFound,
        });
      }
    }
  } catch (error) {
    error.message = `Error en la ruta GET /api/users/:id.\n${error.message}`;
    next(error);
  }
});


UsersRouter.post("/", async (req, res, next) => {
  try {
    // Destructuramos el body
    const { firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).send({
        message: "Fields firstName, lastName, and email are required",
      });
    }

    const userCreated = await UserModel.create({
      email,
      lastName,
      firstName,
    });

    res.status(201).send({
      message: "User created successfully",
      data: userCreated,
    });

  } catch (error) {
    error.message = `Error en la ruta POST /api/users/.\n${error.message}`;
    next(error);
  }
});


UsersRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    // Verificar que el ID es válido (si se usa MongoDB, por ejemplo)
    if (!id) {
      return res.status(400).send({ message: "User ID is required" });
    }

    // Verificar que al menos un campo se está actualizando
    if (!firstName && !lastName && !email) {
      return res.status(400).send({
        message: "Se requiere al menos un campo (nombre, apellido o correo electrónico) para la actualización",
      });
    }

    // Intentar actualizar el usuario
    const userUpdated = await UserModel.findByIdAndUpdate(
      id, // ID del usuario
      { firstName, lastName, email }, // Datos a actualizar
      { new: true, runValidators: true } // Retorna el nuevo documento y valida los datos
    );

    // Si el usuario no fue encontrado
    if (!userUpdated) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    res.status(200).send({
      message: "Usuario actualizado con éxito",
      data: userUpdated,
    });
  } catch (error) {
    error.message = `Error in PUT /api/users/${req.params.id}.\n${error.message}`;
    next(error);
  }
});


UsersRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // Verificar que el ID fue proporcionado
    if (!id) {
      return res.status(400).send({ message: "User ID is required" });
    }

    // Intentar eliminar el usuario por ID
    const userDeleted = await UserModel.findByIdAndDelete(id);

    // Si el usuario no fue encontrado
    if (!userDeleted) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({
      message: "User deleted successfully",
      data: userDeleted, // Devuelve el usuario eliminado si es necesario
    });
  } catch (error) {
    error.message = `Error in DELETE /api/users/${req.params.id}.\n${error.message}`;
    next(error);
  }
});

