
// Seta o link padrão da API do BrasilAPI para consulta de cidades
const brasilApiUrl = 'https://brasilapi.com.br/api/';

export const listarCidades = async (estado) => {

    try {

        const response = await fetch(`${brasilApiUrl}ibge/municipios/v1/${estado}`);
        const data = await response.json();
        return {
            status: 'success',
            data: data.map(cidade => ({ nome: cidade.nome }))
        };

    } catch (error) {

        console.error('Erro ao buscar cidades:', error);
        return {
            status: 'error',
            data: null
        };

    }   

};

export const brasilApiHealth = async () => {

    try {
        // Faz uma requisição simples para verificar se a API do BrasilAPI está respondendo
        const response = await fetch(`${brasilApiUrl}status/v1`);
        const data = await response.json();

        // Verifica se a resposta da API foi bem-sucedida
        if (response.status === 200) {
            return {
                status: 'success',
            };
        // Caso contrário, retorna um status de erro
        } else {
            return {
                status: 'error',
                message: "O BrasilAPI não está respondendo"
            };
        }
        
    } catch (error) {
        console.error('Erro ao verificar saúde da API do BrasilAPI:', error);
        return {
            status: 'error',
            message: "erro ao verificar saúde da API do BrasilAPI"
        };
    }
    
};
