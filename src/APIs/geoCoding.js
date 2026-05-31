
//Seta o link padrão da API de geocoding do OpenMeteo para consulta de coordenadas
const geocodingUrl = 'https://geocoding-api.open-meteo.com/v1/';


export const buscarCoordenadasCidade = async (nomeCidade) => {
    
    try {

        const response = await fetch(`${geocodingUrl}search?name=${encodeURIComponent(nomeCidade)}&count=1&language=pt&format=json`);
        const data = await response.json();

        //Em caso de problemas na requisição, retorna um erro informando que o serviço externo está indisponível
        if(response.status !== 200) {
            return {
                status: 'error',
                http_code: 503,
                codigo: 'SERVICO EXTERNO INDISPONIVEL',
                message: 'Não foi possível obter as coordenadas da cidade no momento',
                servico: 'OpenMeteo Geocoding API'
            }
        }

        if(!data.results || data.results.length === 0) {
           return {
                status: 'error',
                http_code: 404,
                codigo: 'CIDADE_NAO_ENCONTRADA',
                message: 'Nenhuma cidade encontrada com o nome informado'
           }
        }

        return {
            status: 'success',
            message: 'Coordenadas da cidade encontradas com sucesso',
            data: data.results[0]
        };

    } catch (error) {

        return {
            status: 'error',
            http_code: 503,
            codigo: 'SERVICO_INDISPONIVEL',
            message: 'Erro ao buscar coordenadas da cidade',
            servico: 'OpenMeteo Geocoding API'
        }
    }

};

export const geocodingHealthCheck = async () => {

    try {
        const response = await fetch(`${geocodingUrl}search?name=Test&count=1&language=pt&format=json`);

        if (response.status != 200) {
            return {
                status: 'error',
                message: 'API de geocoding não está respondendo normalmente'
            }
        }

        return {
            status: 'success',
            message: 'API de geocoding está respondendo normalmente'
        };


    }

    catch (error) {
        return {
            status: 'error',
            message: 'API de geocoding não está respondendo'
        }
    }
};

        

