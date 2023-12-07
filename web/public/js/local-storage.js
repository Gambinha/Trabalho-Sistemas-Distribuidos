// Função para salvar o access_token no localStorage
export const saveTokenToLocalStorage = (token) => {
    localStorage.setItem('access_token', token);
}

// Função para recuperar o access_token do localStorage
export const getTokenFromLocalStorage = () => {
    return localStorage.getItem('access_token');
}

