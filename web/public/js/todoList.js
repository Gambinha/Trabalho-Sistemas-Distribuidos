import { getTokenFromLocalStorage } from './local-storage.js';

// js/todoList.js
document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = document.querySelector('[name="apiUrl"]').value;
    const createTodoForm = document.getElementById('createTodoForm');
    const todoList = document.getElementById('todoList');

    // Carregar Todos ao abrir a página
    loadTodos();

    // Adicionar evento de envio para o formulário
    createTodoForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const description = document.getElementById('description').value;
        createTodo(description);
    });

    async function handleApiCall(apiCallFn) {
        try {
            const response = await apiCallFn();

            if (response.status === 401) {
                handleUnauthorized();
                return;
            }

            if (response.ok) {
                const data = await response.json();
                return data;
            }

            throw new Error('Erro ao chamar API, tente novamente mais tarde.');
        } catch (error) {
            alert(error.message);
        }
    }

    // Função para carregar Todos
    async function loadTodos() {

        const todos = await handleApiCall(() => fetch(`${apiUrl}/todo`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${getTokenFromLocalStorage()}`,
            }
        }));

        if (!todos) return;

        displayTodos(todos);

    }

    // Função para criar Todo
    async function createTodo(description) {
        const resp = await handleApiCall(() => fetch(
            `${apiUrl}/todo`,
            {
                method: 'POST',
                body: JSON.stringify({ description }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getTokenFromLocalStorage()}`,
                },
            }
        ));

        document.getElementById('description').value = "";

        if (!resp) return;

        loadTodos();
    }

    // Função para deletar Todo
    async function deleteTodo(todoId) {
        const resp = await handleApiCall(() =>
            fetch(`${apiUrl}/todo/${todoId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage()}`,
                },
            }));

        if (!resp) return;

        loadTodos();

    }

    // Função para marcar ou desmarcar Todo como concluído
    async function toggleTodo(todoId, isChecked) {
        const resp = await handleApiCall(() => fetch(

            `${apiUrl}/todo/${todoId}`,
            {
                method: 'PATCH',
                body: JSON.stringify({ checked: isChecked }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getTokenFromLocalStorage()}`,
                },
            }
        ));

        if (!resp) return;

        loadTodos();
    }

    // Função para exibir a lista de Todos
    function displayTodos(todos) {
        todoList.innerHTML = '';

        todos.forEach(todo => {
            const li = document.createElement('li');
            li.innerHTML = `
                <input class="checkbox" type="checkbox" ${todo.checked ? 'checked' : ''}>
                <p title=${todo.description} class="description ${todo.checked ? 'description-checked' : ''}">${todo.description}</p>
                <button class="deleteBtn">Excluir</button>
            `;

            li.querySelector('.checkbox').addEventListener('change', function () {
                toggleTodo(todo.id, this.checked);
            });

            li.querySelector('.deleteBtn').addEventListener('click', function () {
                deleteTodo(todo.id);
            });

            todoList.appendChild(li);
        });
    }

    // Função para lidar com erro de autorização (status 401)
    function handleUnauthorized() {
        alert('Sessão expirada. Faça login novamente.');
        // Redirecionar para a tela de login
        window.location.href = '/';

    }
});