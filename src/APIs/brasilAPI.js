
// Seta o link padrão da API do BrasilAPI para consulta de cidades
const brasilApiUrl = 'https://brasilapi.com.br/api/';

export const listarCidades = async (estado) => {

    try {

        const response = await fetch(`${brasilApiUrl}ibge/municipios/v1/${estado}`);
        const data = await response.json();

        if(response.status !== 200) {
            return {
                status: 'error',
                message: 'Erro na resposta da API do BrasilAPI ao buscar cidades'
            };
        }

        return {
            status: 'success',
            message: `Cidades do estado ${estado} listadas com sucesso`,
            data: data.map(cidade => ({ nome: cidade.nome }))
        };

    } catch (error) {

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
