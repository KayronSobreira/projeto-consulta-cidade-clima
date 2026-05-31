
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
                    status_code: 200,
                    estado: estado,
                    cidades: data.map(cidade => ({ nome: cidade.nome }))
                };
            case 400:
                return {
                    status: 'error',
                    status_code: 400,
                    message: "UF AUSENTE OU COM FORMATO INVÁLIDO"
                };
            case 404:
                return {
                    status: 'error',
                    status_code: 404,
                    message: "UF NÃO ENCONTRADA"
                }
            case 422:
                return {
                    status: 'error',
                    status_code: 422,
                    message: "ESTADO COM A SIGLA INFORMADA NÃO FOI ENCONTRADO"
                };
            case 500:
                return {
                    status: 'error',
                    status_code: 500,
                    message: "ERRO INTERNO AO CONSULTAR A API DO BRASILAPI"
                };
            default:
                return {
                    status: 'error',
                    status_code: 500,
                    message: "ERRO INESPERADO AO CONSULTAR A API DO BRASILAPI"
                };       
        };

    } catch (error) {
        // Em caso de erro na requisição, retorna uma mensagem de erro genérica.
        return {
            status: 'error',
            status_code: 500,
            message: 'ERRO NA REQUISIÇÃO À API DO BRASILAPI',
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
                    http_code: 400,
                    message: "COORDENADAS INVÁLIDAS"
                };
            case 404:
                return {
                    status: 'error',
                    http_code: 404,
                    message: "COORDENADAS NÃO CORRESPONDEM A UMA LOCALIDADE VÁLIDA"
                };
            case 500:
                return {
                    status: 'error',
                    http_code: 500,
                    message: "ERRO INTERNO AO CONSULTAR A API DO BRASILAPI"
                };
            default:
                return {
                    status: 'error',
                    http_code: 500,
                    message: "ERRO INESPERADO AO CONSULTAR A API DO BRASILAPI"
                };       
        };

    } catch (error) {
        // Em caso de erro na requisição, retorna uma mensagem de erro genérica.
        return {
            status: 'error',
            http_code: 500,
            message: 'ERRO NA REQUISIÇÃO A API DO BRASILAPI',
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
                message: 'ERRO NA RESPOSTA DA API DO BRASILAPI'
            };
        }

        return {
            status: 'success',
            message: 'API DO BRASILAPI ESTÁ RESPONDENDO NORMALMENTE'
        };
        
    } catch (error) {

        return {
            status: 'error',
            message: "ERRO AO VERIFICAR SAÚDE DA API DO BRASILAPI"
        };

    }
    
};

