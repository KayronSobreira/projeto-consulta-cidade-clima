
//Seta o link padrão da API de geocoding do OpenMeteo para consulta de coordenadas
const geocodingUrl = 'https://geocoding-api.open-meteo.com/v1/';


export const buscarCoordenadasCidade = async (nomeCidade) => {
    
    try {

        const response = await fetch(`${geocodingUrl}search?name=${encodeURIComponent(nomeCidade)}&count=1&language=pt&format=json`);
        const data = await response.json();

        if(!data.results || data.results.length === 0) {
           return {
                status: 'error',
                message: 'Cidade não encontrada'
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
            message: 'Erro ao buscar coordenadas da cidade'
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

        

