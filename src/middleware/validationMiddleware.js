export const validateInputProducts = (req, res, next) => {
  //Validar que req.body cumpla con las propiedades que debe tener un producto
  //Si cumple => next()
  //Si no cumple => res.status(400).send({message: "Faltan algunos parámetros"})
  console.log("Entra al middleware de validacion");
  next();
};

export const validateInputCarts = (req, res, next) => {
  //Validar que req.body cumpla con las propiedades que debe tener un producto
  //Si cumple => next()
  //Si no cumple => res.status(400).send({message: "Faltan algunos parámetros"})
  console.log("Entra al middleware de validacion de carts");
  next();
};

export const validateInputHome = (req, res, next) => {
  //Validar que req.body cumpla con las propiedades que debe tener un producto
  //Si cumple => next()
  //Si no cumple => res.status(400).send({message: "Faltan algunos parámetros"})
  console.log("Entra al middleware de validacion de Home");
  next();
};