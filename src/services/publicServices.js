import {listarCidades} from '../APIs/brasilAPI.js';

export const listarCidadesService = async (estado) => {
    
    try {
        const cidades = await listarCidades(estado);
        return cidades;
    }
    catch (error) {
        console.error(error);
        throw new Error('Erro ao listar as cidades');
    }

}