import express from 'express';
import { healthCheckController } from '../controller/utilsController.js';

const router = express.Router();

//Rota de healthcheck
router.get('/api/v1/health', healthCheckController);

export default router;