import express from 'express';
import config from './config/index.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import cors from 'cors';
import http from 'http';
import gameRouter from './routes/game/index.js';
import notFoundMiddleware from './middlewares/notFoundMiddleware.js';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
/* When you realise your app needs to be SSR 🤦‍♂️ */
const appIndexFile = fs.readFileSync(path.join(__dirname, '../../build/index.html'), 'utf8');
const { SERVER } = config;

const server = http.createServer(app);

/* Middlewares */
app.use(cors());
gameRouter(server);
app.use('/', express.static(path.join(__dirname, '../../build')));
/* remove this hack when you can be arsed */
app.get('/game/*', (_, res) => res.send(appIndexFile));
app.use(errorHandlerMiddleware);

/* start */
server.listen(SERVER.PORT, () => {
  console.log(`Application listening on ${SERVER.PORT}`);
});
