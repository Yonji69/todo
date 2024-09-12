// Fetch and display todos
const todoList = document.getElementById('todo-list');
const todoInput = document.getElementById('todo-input');

function fetchTodos() {
  fetch('/todos')
    .then(res => res.json())
    .then(todos => {
      todoList.innerHTML = '';
      todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${todo.text}</span>
          <button onclick="editTodoPrompt(${todo.id})">Edit</button>
          <button onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        todoList.appendChild(li);
      });
    });
}


document.getElementById('add-todo').addEventListener('click', () => {
  const text = todoInput.value;
  if (text) {
    fetch('/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })
    .then(fetchTodos);
  }
});


function editTodoPrompt(id) {
  const newText = prompt('Enter new text');
  if (newText) {
    fetch(`/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newText })
    }).then(fetchTodos);
  }
}

// Delete todo
function deleteTodo(id) {
  fetch(`/todos/${id}`, { method: 'DELETE' })
    .then(fetchTodos);
}

// Initial fetch
fetchTodos();
