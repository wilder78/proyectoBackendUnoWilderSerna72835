export const validateInputProducts = (req, res, next) => {
  // Validar que req.body cumpla con las propiedades que debe tener el producto.
  console.log("Entra al middleware de validación");
  next();
};
