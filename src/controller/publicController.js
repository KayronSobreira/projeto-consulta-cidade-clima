import {listarCidadesService} from '../services/publicServices.js';


export const listarCidadesController = async (req, res) => {

    try {

        const estado = req.params.estado;
        const cidades = await listarCidadesService(estado);
        res.json(cidades);

    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao listar as cidades' });
    }

};