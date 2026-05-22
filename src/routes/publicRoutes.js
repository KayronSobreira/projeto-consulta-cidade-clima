import express from 'express';
import {listarCidadesController, buscarClimaController} from '../controller/publicController.js';

const router = express.Router();

//rota para listar cidades
router.get('/cidades/:estado', listarCidadesController);

//rota para buscar clima
router.get('/api/v1/clima/:cidade', buscarClimaController);

export default router;
