import { HashPassword } from './hash-password.js';

document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = document.querySelector('[name="apiUrl"]').value;
    const signupForm = document.getElementById('signupForm');

    signupForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!name || !email || !password) {
            alert('Preencha todos os campos');
            return;
        }

        try {
            // Criptografe a senha antes de enviar
            const hashedPassword = await HashPassword(password);

            // Faça a chamada para a API de cadastro de usuário
            const response = await fetch(`${apiUrl}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password: hashedPassword,
                }),
            });

            alert('Usuário cadastrado com sucesso');

            // Redirecionar para a página de login após o cadastro
            window.location.href = '/';
        } catch (error) {
            alert('Erro ao cadastrar usuário');
        }
    });

});