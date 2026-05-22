
// Seta o link padrão da API do BrasilAPI para consulta de cidades
const brasilApiUrl = 'https://brasilapi.com.br/api/';

export const listarCidades = async (estado) => {

    try {

        const response = await fetch(`${brasilApiUrl}ibge/municipios/v1/${estado}`);
        const data = await response.json();

        //Verifica o código de status da resposta e retorna um objeto com o status e os dados ou mensagens de erro correspondentes
        switch (response.status) {
            case 200:
                return {
                    status: 'success',
                    estado: estado,
                    cidades: data.map(cidade => ({ nome: cidade.nome }))
                };
            case 400:
                return {
                    status: 'error',
                    message: "UF ausente ou com formato inválido"
                };
            case 404:
                return {
                    status: 'error',
                    message: "Sigla não corresponde a um estado válido do Brasil"
                }
            case 422:
                return {
                    status: 'error',
                    message: "Parâmetro de estado inválido ou vazio"
                };
            case 500:
                return {
                    status: 'error',
                    message: "Erro interno ao consultar a API do BrasilAPI"
                };
            default:
                return {
                    status: 'error',
                    message: "Erro Inesperado ao consultar a API do BrasilAPI"
                };       
        };

    } catch (error) {
        // Em caso de erro na requisição, retorna uma mensagem de erro genérica.
        return {
            status: 'error',
            message: 'Erro na requisição à API do BrasilAPI',
        };

    }   

};

export const buscarClima = async (latitude, longitude) => {

    try {
        const response = await fetch(`${brasilApiUrl}cptec/v1/clima/previsao/semana/${latitude}/${longitude}`);
        const data = await response.json();

        // Verifica o código de status da resposta e retorna um objeto com o status e os dados ou mensagens de erro correspondentes
        switch (response.status) {
            case 200:
                return {
                    status: 'success',
                    data: data
                };
            case 400:
                return {
                    status: 'error',
                    message: "Coordenadas inválidas"
                };
            case 404:
                return {
                    status: 'error',
                    message: "Coordenadas não correspondem a uma localidade válida"
                };
            case 500:
                return {
                    status: 'error',
                    message: "Erro interno ao consultar a API do BrasilAPI"
                };
            default:
                return {
                    status: 'error',
                    message: "Erro Inesperado ao consultar a API do BrasilAPI"
                };       
        };

    } catch (error) {
        // Em caso de erro na requisição, retorna uma mensagem de erro genérica.
        return {
            status: 'error',
            message: 'Erro na requisição à API do BrasilAPI',
        };

    }   

};

export const brasilApiHealth = async () => {

    try {
        // Faz uma requisição simples para verificar se a API do BrasilAPI está respondendo
        const response = await fetch(`${brasilApiUrl}status/v1`);
        const data = await response.json();

        // Verifica se a resposta da API foi bem-sucedida
        if(response.status !== 200) {
            return {
                status: 'error',
                message: 'Erro na resposta da API do BrasilAPI'
            };
        }

        return {
            status: 'success',
            message: 'API do BrasilAPI está respondendo normalmente'
        };
        
    } catch (error) {

        return {
            status: 'error',
            message: "erro ao verificar saúde da API do BrasilAPI"
        };

    }
    
};

