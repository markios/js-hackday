import express from 'express';
import config from './config/index.js';
import cors from 'cors';
import http from 'http';
import gameRouter from './routes/game/index.js';
import notFoundMiddleware from './middlewares/notFoundMiddleware.js';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';

const app = express();
const { SERVER } = config;

const server = http.createServer(app);

/* Middlewares */
app.use(cors());
gameRouter(server);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

/* start */
server.listen(SERVER.PORT, () => {
  console.log(`Application listening on ${SERVER.PORT}`);
});
