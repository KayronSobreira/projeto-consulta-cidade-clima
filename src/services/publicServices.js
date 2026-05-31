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

        //verifica se a resposta foi bem sucedida:
        if(consultaCidades.status === 'error') {
            return {
                erro: true,
                http_code: consultaCidades.status_code || 500,
                codigo: consultaCidades.message || 'UF NAO_ENCONTRADA',
                sigla_uf_informada: estado
            }
        };

        //verificar se a quantidade de cidades solicitada é maior que zero, caso seja,
        //limitar a lista de cidades ao número solicitado, caso contrário, retornar todas as cidades
        if(limite) {
            listaCidades = consultaCidades.cidades.slice(0, limite);
        }
        else{
            listaCidades = consultaCidades.cidades;
        }
        
        return {
            uf: consultaCidades.estado.toUpperCase(),
            quantidade_retornada: listaCidades.length,
            cidades: listaCidades
        };

    }
    catch (error) {
        console.error(error);
    }

}

export const buscarClimaService = async (cidade) => {

    //verifica se o nome da cidade é válido, verificando se tem pelo menos 2 caracteres
    if (cidade.length < 2) {
            return {
                erro: true,
                http_code: 400,
                codigo: 'CIDADE INVALIDA',
                message: 'O nome da cidade deve conter pelo menos 2 caracteres',
                nome_informado: cidade
            };
        };

    try {

        // Busca as coordenadas da cidade usando a API de geocoding
        const reqCoordenadas = await buscarCoordenadasCidade(cidade);

        // Verifica se a resposta da API de geocoding foi bem-sucedida
        if (reqCoordenadas.status === 'error') {
            return {
                erro: true,
                http_code: reqCoordenadas.http_code,
                codigo: reqCoordenadas.codigo,
                message: reqCoordenadas.message,
                servico: reqCoordenadas.servico ? reqCoordenadas.servico : undefined,
                nome_informado: cidade
            };
        };

        //caso seja bem sucedida, armazenamos as coordenadas para usar na consulta do clima
        const coordenadas = reqCoordenadas.data;

        //verifica se as coordenadas obtidas são do brasil
        if (coordenadas.country_code !== 'BR') {
            return {
                erro: true,
                http_code: 404,
                codigo: 'CIDADE NAO ENCONTRADA',
                message: 'Nenhuma cidade encontrada com o nome informado',
                nome_informado: cidade
            };
        };

        //Busca o clima da cidade usando as coordenadas obtidas e a API do BrasilAPI
        const consultaClima = await buscarClima(coordenadas.latitude, coordenadas.longitude);

        //verifica se o serviço de clima retornou um erro, caso tenha retornado, repassa o erro para o controller
        if(consultaClima.status === 'error' && consultaClima.http_code === 500) {
            return {
                erro: true,
                http_code: consultaClima.http_code,
                codigo: "SERVIÇO EXTERNO INDISPONÍVEL",
                message: "Não foi possível obter dados do serviço externo. Tente novamente em alguns instantes",
                servico: "CPTEC"
            };
        }

        //verifica se a resposta da API do BrasilAPI foi bem-sucedida
        if (consultaClima.status === 'error') {
            return {
                erro: true,
                http_code: consultaClima.http_code,
                codigo: consultaClima.codigo,
                message: consultaClima.message
            };
        };

        const dadosClima = consultaClima.data;

        //remove o campo de data das informações de clima pois sera incluido em outro campo no formato ISO 8601.
        dadosClima.clima[0].data = undefined;

        return {
            nome: dadosClima.cidade,
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
