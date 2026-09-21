const STORAGE_KEY = 'taskflow-academico.tasks';

const taskForm = document.getElementById('taskForm');
const titleInput = document.getElementById('title');
const dueDateInput = document.getElementById('dueDate');
const priorityInput = document.getElementById('priority');
const filterInput = document.getElementById('filter');
const clearCompletedButton = document.getElementById('clearCompleted');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const summary = document.getElementById('summary');

let tasks = loadTasks();

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function createTask(title, dueDate, priority) {
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    title,
    dueDate,
    priority,
    done: false,
    createdAt: new Date().toISOString()
  };
}

function formatDate(dateString) {
  if (!dateString) return 'Sem prazo';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

function render() {
  const filter = filterInput.value;
  const visibleTasks = tasks.filter(task => {
    if (filter === 'pendentes') return !task.done;
    if (filter === 'concluidas') return task.done;
    return true;
  });

  taskList.innerHTML = '';

  visibleTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task ${task.done ? 'done' : ''}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => toggleTask(task.id));

    const content = document.createElement('div');
    content.innerHTML = `
      <div class="task-title">${escapeHtml(task.title)}</div>
      <div class="task-meta">
        Prazo: ${formatDate(task.dueDate)}
        <span class="badge">${task.priority}</span>
      </div>
    `;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.textContent = 'Excluir';
    deleteButton.addEventListener('click', () => deleteTask(task.id));

    li.append(checkbox, content, deleteButton);
    taskList.appendChild(li);
  });

  const pending = tasks.filter(t => !t.done).length;
  const done = tasks.filter(t => t.done).length;
  summary.textContent = `Total: ${tasks.length} | Pendentes: ${pending} | Concluídas: ${done}`;
  emptyState.hidden = visibleTasks.length > 0;
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function toggleTask(id) {
  tasks = tasks.map(task => task.id === id ? { ...task, done: !task.done } : task);
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  render();
}

taskForm.addEventListener('submit', event => {
  event.preventDefault();

  const title = titleInput.value.trim();
  const dueDate = dueDateInput.value;
  const priority = priorityInput.value;

  if (!title || !dueDate) return;

  tasks.push(createTask(title, dueDate, priority));
  saveTasks();
  taskForm.reset();
  priorityInput.value = 'Média';
  render();
});

filterInput.addEventListener('change', render);

clearCompletedButton.addEventListener('click', () => {
  tasks = tasks.filter(task => !task.done);
  saveTasks();
  render();
});

render();
