import express from 'express';
import cors from 'cors';

// Importa as rotas
import utilsRoutes from './src/routes/utilsRoutes.js';
import publicRoutes from './src/routes/publicRoutes.js';

const app = express();

// Middlewares
app.use(
  cors(),
  express.json()
);

app.use('/', publicRoutes, utilsRoutes);

// Inicia o servidor somente quando não estiver em ambiente de teste.
const PORT = 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`O Servidor Online em http://localhost:${PORT}`);
  });
}