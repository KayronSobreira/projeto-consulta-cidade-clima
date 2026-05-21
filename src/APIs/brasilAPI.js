
// Seta o link padrão da API do BrasilAPI para consulta de cidades
const brasilApiUrl = 'https://brasilapi.com.br/api/';

export const listarCidades = async (estado) => {

    try {

        const response = await fetch(`${brasilApiUrl}ibge/municipios/v1/${estado}`);
        const data = await response.json();

        //Verifica se a resposta da API foi bem-sucedida ou se o estado não foi encontrado
        if(response.status != 200 && response.status != 400) {
            return {
                status: 'error',
                message: 'Erro na resposta da API do BrasilAPI ao buscar cidades'
            };
        }

        // Verifica se o estado não foi encontrado
        if(response.status == 400) {
            return {
                status: 'not_found',
                message: 'Estado não encontrado'
            };
        }

        // Retorna a lista de cidades do estado solicitado.
        return {
            status: 'success',
            estado: estado,
            quantidade: data.length,
            cidades: data.map(cidade => ({ nome: cidade.nome }))
        };

    } catch (error) {
        // Em caso de erro na requisição, retorna uma mensagem de erro genérica.
        return {
            status: 'error',
            message: 'Erro ao buscar cidades'
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
