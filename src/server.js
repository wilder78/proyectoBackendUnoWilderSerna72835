import initApp from "./app/index.js";
import { config } from "./config/indexConfig.js";
import { initMongoDBAtlas } from "./db/index.js";

//Connection MongoDB Atlas
await initMongoDBAtlas();

const app = initApp();

const server = app.listen(config.PORT, () => {
  console.info(`Server listen on: http://localhost:${config.PORT}`);
});
