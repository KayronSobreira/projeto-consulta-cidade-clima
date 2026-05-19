
//Seta o link padrão da API de geocoding do OpenMeteo para consulta de coordenadas
const geocodingUrl = 'https://geocoding-api.open-meteo.com/v1/';


export const buscarCoordenadasCidade = async (nomeCidade) => {
    
    try {

        const response = await fetch(`${geocodingUrl}search?name=${encodeURIComponent(nomeCidade)}&count=1&language=pt&format=json`);
        const data = await response.json();

        return data.results;

    } catch (error) {

        console.error('Erro ao buscar coordenadas da cidade:', error);
        return {
            status: 'error',
            data: null
        }
    }

};

export const geocodingHealthCheck = async () => {

    try {
        const response = await fetch(`${geocodingUrl}search?name=Test&count=1&language=pt&format=json`);

        

