import express from "express";
import config, { isProduction } from "./config/index.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import basicAuth from "express-basic-auth";
import cors from "cors";
import http from "http";
import gameRouter from "./routes/game/index.js";
import healthRouter from './routes/health/index.js'
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

const { SERVER, USERS } = config;

const server = http.createServer(app);

/* Middlewares */
app.use(cors());
if (isProduction()) {
  app.use(
    basicAuth({ users: USERS, challenge: true, realm: config.AUTH.REALM })
  );
}
gameRouter(server);
healthRouter(app);

if (isProduction()) {
  try {
    /* When you realise your app needs to be SSR 🤦‍♂️ */
    const appIndexFile = fs.readFileSync(
      path.join(__dirname, "../../build/index.html"),
      "utf8"
    );
    app.use("/", express.static(path.join(__dirname, "../../build")));

    /* remove this hack when you can be arsed */
    app.get("/game/*", (_, res) => res.send(appIndexFile));
  } catch (error) {
    throw new Error("failed to load static assets");
  }
}

app.use(errorHandlerMiddleware);
/* start */
server.listen(SERVER.PORT, () => {
  console.log(`Application listening on ${SERVER.PORT}`);
});
