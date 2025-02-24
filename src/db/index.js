import { connect } from "mongoose";
import { config } from "../config/indexConfig.js";

export const initMongoDBAtlas = async () => {
  try {
    await connect(config.db.connectionString);
    console.log(
      "Conectado con la base de datos de mongoDB: ",
      config.db.connectionString
    );
  } catch (error) {
    console.error(
      `Error en la conexión a la base de datos, motivo: "${error.message}"`
    );
  }
};
