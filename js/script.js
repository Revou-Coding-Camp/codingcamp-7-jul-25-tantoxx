const form = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoDate = document.getElementById('todo-date');
const todoList = document.getElementById('todo-list');
const filterDate = document.getElementById('filter-date');
const filterButton = document.getElementById('filter-button');
const deleteAllButton = document.getElementById('delete-all');

let todos = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const task = todoInput.value.trim();
  const date = todoDate.value;

  if (!task || !date) {
    alert("Please enter both task and date.");
    return;
  }

  const todo = {
    id: Date.now(),
    task,
    date
  };

  todos.push(todo);
  todoInput.value = '';
  todoDate.value = '';

  renderTodos();
});

function renderTodos() {
  const filter = filterDate.value;
  todoList.innerHTML = '';

  let filteredTodos = filter
    ? todos.filter(t => t.date === filter)
    : [...todos];

  filteredTodos.sort((a, b) => new Date(a.date) - new Date(b.date));

  if (filteredTodos.length === 0) {
    todoList.innerHTML = '<li>No task found.</li>';
    return;
  }

  filteredTodos.forEach(todo => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div>
        ${todo.task}
        <span class="date">(${todo.date})</span>
      </div>
      <button onclick="deleteTodo(${todo.id})" style="padding: 10px; border-radius: 10px;">Delete</button>
    `;
    todoList.appendChild(li);
  });
}


function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
}

filterDate.addEventListener('change', renderTodos);

filterButton.addEventListener('click', () => {
  if (filterDate.style.display === 'none') {
    filterDate.style.display = 'inline-block';
    filterDate.focus();
  } else {
    filterDate.style.display = 'none';
    filterDate.value = '';
    renderTodos();
  }
});

deleteAllButton.addEventListener('click', () => {
  const confirmDelete = confirm("Delete all tasks?");
  if (confirmDelete) {
    todos = [];
    renderTodos();
  }
});
