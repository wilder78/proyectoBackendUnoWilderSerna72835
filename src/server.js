import initApp from "./app/index.js";

const app = initApp();

const server = app.listen(8080, () => {
  console.info("Server listen on http://localhost:8080");
});
