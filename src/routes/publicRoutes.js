import express from 'express';
import {listarCidadesController} from '../controller/publicController.js';

const router = express.Router();

//rota para listar cidades
router.get('/cidades/:estado', listarCidadesController);

export default router;
