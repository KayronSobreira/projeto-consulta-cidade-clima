import {healthCheckService} from '../services/utilsServices.js';


export const healthCheckController = async (req, res) => {

    try {
        const healthStatus = await healthCheckService();
        res.json(healthStatus);

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: 'Erro ao realizar o health check' });
        
    };
};