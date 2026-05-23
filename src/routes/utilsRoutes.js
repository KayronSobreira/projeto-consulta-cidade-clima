import express from 'express';
import { healthCheckController } from '../controller/utilsController.js';

const router = express.Router();

//Rota de healthcheck
router.get('/health', healthCheckController);

export default router;