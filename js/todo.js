const host = "http://127.0.0.1:8080";
const todosContainer = document.querySelector('.todos-container');

function getTodos() {
    axios.get(`${host}/todo`)
        .then(Response => {
            console.log(Response.data);
            renderTodos(Response.data.todos);
        })
        .catch(error => {
            console.error('Error fetching todos:',error);
        });
}

function renderTodos(todos) {
    todosContainer.innerHTML =''; //todosContainer 초기화
    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-item');
        todoDiv.textContent = todo.item;
        todosContainer.appendChild(todoDiv);

        //삭제 버튼 생성 및 이벤트 처리
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'X';

        deleteBtn.addEventListener('click', function() {
            deleteTodo(todo.id); /* deleteTodo 함수는 70에 있음 */
        });

        //todoDiv에 삭제 버튼 추가
        todoDiv.appendChild(deleteBtn);
    })
}

/* 처음 접속하자마자 getTodos()가 실행되도록 구현*/
window.addEventListener('DOMContentLoaded', function() {
    getTodos();
});

/* 엔터키를 통한 POST method 호출 */
const todoInput = document.querySelector('.todo-input');

todoInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});

/* addTodos() 구현*/
function addTodo() {
    const title = todoInput.value.trim();
    let todoData = {
        id: 0,
        item: title
    };
    if (title === '') return;

    axios.post(`${host}/todo`,todoData)
        .then(Response => {
            todoInput.value = '';
            getTodos();
        })
        .catch(error => {
            console.error('Error adding todo:', error);
        });
}

/* deleteTodo 함수 구현 */
 function deleteTodo(id) {
    axios.delete(`${host}/todo/${id}`)
        .then(Response => {
            getTodos();
        })
        .catch(error => {
            console.error('Error delating todo:', error);
        });
 }
