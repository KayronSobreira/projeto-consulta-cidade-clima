import {listarCidadesService, buscarClimaService} from '../services/publicServices.js';


export const listarCidadesController = async (req, res) => {

    try {

        const estado = req.params.estado;
        const limite = parseInt(req.query.limite) || null;
        const cidades = await listarCidadesService(estado, limite);
        res.json(cidades);

    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao listar as cidades' });
    }

};

export const buscarClimaController = async (req, res) => {
    try {
        const cidade = req.params.cidade;
        const clima = await buscarClimaService(cidade);
        res.json(clima);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar o clima' });
    }
};