//Importa as APIs necessárias para o funcionamento do projeto
import {listarCidades, buscarClima, brasilApiHealth} from "../APIs/brasilApi.js";
import {buscarCoordenadasCidade, geocodingHealthCheck} from "../APIs/geoCoding.js";

export const listarCidadesService = async (estado, limite) => {
    
    try {
        const consultaCidades = await listarCidades(estado, limite);
        let listaCidades = [];
        let qtdadeCidades = 0;

        //verificar se a quantidade de cidades solicitada é maior que zero, caso seja,
        //limitar a lista de cidades ao número solicitado, caso contrário, retornar todas as cidades
        if(limite) {
            listaCidades = consultaCidades.cidades.slice(0, limite);
        }
        else{
            listaCidades = consultaCidades.cidades;
        }
        
        return {
            nome: estado,
            qtdade: listaCidades.length,
            cidades: listaCidades
        };

    }
    catch (error) {
        console.error(error);
    }

}

export const buscarClimaService = async (cidade) => {

    try {
        // Primeiro, buscamos as coordenadas da cidade usando a API de geocoding
        const coordenadas = await buscarCoordenadasCidade(cidade);
        const data = coordenadas.data;

        // Verificamos se a resposta da API de geocoding foi bem-sucedida
        if (data.status === 'error') {
            return {
                status: 'error',
                message: data.message
            };
        };

        const consultaClima = await buscarClima(data.latitude, data.longitude);

        //verifica se a resposta da API do BrasilAPI foi bem-sucedida
        if (consultaClima.status === 'error') {
            return {
                status: 'error',
                message: consultaClima.message
            };
        };

        return {
            status: 'success',
            cidade: cidade,
            estado: consultaClima.data.estado,
            clima: consultaClima.data.clima[0],
            unidades: {temperatura: '°C'},
            consultado_em: new Date().toISOString()
        };

    } catch (error) {
        console.error(error);
        // Em caso de erro na requisição, retorna uma mensagem de erro genérica.
        return {
            status: 'error',
            message: 'Erro ao buscar o clima'
        };
    }
};
