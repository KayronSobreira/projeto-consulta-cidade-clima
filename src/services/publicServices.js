//Importa as APIs necessárias para o funcionamento do projeto
import {listarCidades, brasilApiHealth} from "../APIs/brasilApi.js";
import {buscarCoordenadasCidade, geocodingHealthCheck} from "../APIs/geoCoding.js";
import {buscarClimaAtual, openMeteoHealth} from "../APIs/openMeteo.js";

export const listarCidadesService = async (estado) => {
    
    try {
        const cidades = await listarCidades(estado);
        return cidades;
    }
    catch (error) {
        console.error(error);
    }

}