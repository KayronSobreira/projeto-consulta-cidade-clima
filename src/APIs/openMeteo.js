
//seta o link padrão da API do OpenMeteo para consulta de clima
const openMeteoUrl = 'https://api.open-meteo.com/v1/';


export const buscarClimaAtual = async (latitude, longitude) => {

    try {
        // Faz a requisição para a API do OpenMeteo usando as coordenadas fornecidas
        const response = await fetch(`${openMeteoUrl}forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const data = await response.json();

        // Verifica se a resposta da API foi bem-sucedida
        if (response.status !== 200) {
            return {
                status: 'error',
                message: "erro ao buscar clima atual"
            };
        }

        //caso seja bem-sucedida, retorna os dados do clima atual
        return {
            status: 'success',
            message: "clima atual encontrado com sucesso",
            data: data
        };

    } catch (error) {

        return {
            status: 'error',
            message: "erro ao buscar clima atual",
        };
    }
};


export const openMeteoHealth = async () => {

    try {
        
        const response = await buscarClimaAtual(0, 0); // Testa a API com coordenadas inválidas para verificar se está respondendo

        if (response.status === 'success') {
            return {
                status: 'success'
            };

        } else {
            return {
                status: 'error',
                message: "O OpenMeteo não está respondendo",
           };
        }

    } catch (error) {

        return {
            status: 'error',
            message: "erro ao verificar saúde da API do OpenMeteo",
        };
    }
};
