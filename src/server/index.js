import express from 'express';
import config from './config/index.js';
// import gameRouter from './routes/game/index.js';
import notFoundMiddleware from './middlewares/notFoundMiddleware.js';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';

const app = express();
const { SERVER } = config;

app.get('/game', (_, res) => {
  res.json({ message: 'welcome' });
});

/* Middlewares */
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

/* start */
app.listen(SERVER.PORT, () => {
  console.log(`Application listening on ${SERVER.PORT}`);
});