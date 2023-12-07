import { HashPassword } from './hash-password.js';
import { saveTokenToLocalStorage } from './local-storage.js';

document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = document.querySelector('[name="apiUrl"]').value;

    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            alert('Preencha todos os campos');
            return;
        }

        try {
            // Criptografe a senha antes de enviar
            const hashedPassword = await HashPassword(password);

            // Faça a chamada para a API de autenticação
            const response = await fetch(`${apiUrl}/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password: hashedPassword,
                }),
            });

            if (response.status === 422) {
                alert('Usuário ou senha inválidos');
                return;
            }

            const data = await response.json();

            if (data && data.accessToken) {
                alert('Login bem-sucedido');

                // Salva o accessToken no localStorage
                saveTokenToLocalStorage(data.accessToken);

                // Redirecionar para a página de gerenciamento de Todos após o login
                window.location.href = 'todoList';
                return;
            }


        } catch (error) {
            alert('Erro ao fazer login:');
        }
    });
});