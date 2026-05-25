//Importa as APIs necessárias para o funcionamento do projeto
import {listarCidades, buscarClima, brasilApiHealth} from "../APIs/brasilApi.js";
import {buscarCoordenadasCidade, geocodingHealthCheck} from "../APIs/geoCoding.js";

export const listarCidadesService = async (estado, limite) => {

    //Valida se a sigla é válida.
    if(estado.length !== 2 || !estado) {
        return {
            erro: true,
            http_code: 400,
            codigo: 'SIGLA_UF_INVALIDA',
            message: 'A sigla do estado deve conter exatamente 2 letras',
            sigla_uf_informada: estado
        };
    };

    
    try {
        const consultaCidades = await listarCidades(estado, limite);
        let listaCidades = [];
        let qtdadeCidades = 0;
        let erro, http_code, message, codigo, sigla_uf_informada;

        //verificar se a quantidade de cidades solicitada é maior que zero, caso seja,
        //limitar a lista de cidades ao número solicitado, caso contrário, retornar todas as cidades
        if(limite) {
            listaCidades = consultaCidades.cidades.slice(0, limite);
        }
        else{
            listaCidades = consultaCidades.cidades;
        }

        //verifica se a resposta foi bem sucedida:
        if(consultaCidades.status === 'error') {
            return {
                erro: true,
                http_code: consultaCidades.status_code || 500,
                codigo: consultaCidades.message || 'UF NAO_ENCONTRADA',
                sigla_uf_informada: estado
            }
        };
        
        return {
            uf: listaCidades[0].estado,
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
        // Busca as coordenadas da cidade usando a API de geocoding
        const reqCoordenadas = await buscarCoordenadasCidade(cidade);

        // Verifica se a resposta da API de geocoding foi bem-sucedida
        if (reqCoordenadas.status === 'error') {
            return {
                status: 'error',
                message: reqCoordenadas.message
            };
        };

        //caso seja bem sucedida, armazenamos as coordenadas para usar na consulta do clima
        const coordenadas = reqCoordenadas.data;

        //verifica se as coordenadas obtidas são do brasil, caso contrário, retorna um erro informando que a cidade não é válida
        if (coordenadas.country_code !== 'BR') {
            return {
                status: 'error',
                message: 'Cidade não localizada no Brasil'
            };
        };

        //Busca o clima da cidade usando as coordenadas obtidas e a API do BrasilAPI
        console.log("Coordenadas obtidas:", coordenadas);
        const consultaClima = await buscarClima(coordenadas.latitude, coordenadas.longitude);

        //verifica se a resposta da API do BrasilAPI foi bem-sucedida
        if (consultaClima.status === 'error') {
            return {
                status: 'error',
                message: consultaClima.message
            };
        };

        const dadosClima = consultaClima.data;

        return {
            status: 'success',
            cidade: dadosClima.cidade,
            estado: dadosClima.estado,
            clima: dadosClima.clima[0],
            unidades: {temperatura: '°C'},
            consultado_em: new Date().toISOString()
        };

    } catch (error) {
        console.log("Erro do serviço de busca de clima:", error);
        // Em caso de erro na requisição, retorna uma mensagem de erro genérica.
        return {
            status: 'error',
            message: 'Erro ao buscar o clima'
        };
    }
};
