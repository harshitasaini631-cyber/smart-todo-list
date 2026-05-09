const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filters button");

let tasks = [];
let currentFilter = "all";

// Add task
function addTask() {
  const text = taskInput.value.trim();

  if (text === "") {
    alert("Please enter a task");
    return;
  }

  const newTask = {
    id: Date.now(),
    text: text,
    completed: false
  };

  tasks.push(newTask);
  taskInput.value = "";

  renderTasks();
}

// Show tasks on screen
function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if (currentFilter === "completed") {
    filteredTasks = tasks.filter(function (task) {
      return task.completed;
    });
  } else if (currentFilter === "pending") {
    filteredTasks = tasks.filter(function (task) {
      return !task.completed;
    });
  }

  filteredTasks.forEach(function (task) {
    const li = document.createElement("li");

    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <span>${task.text}</span>
      <div class="task-actions">
        <button onclick="toggleTask(${task.id})">Done</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

// Mark complete / pending
function toggleTask(id) {
  tasks = tasks.map(function (task) {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  renderTasks();
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });

  renderTasks();
}

// Add button click
addBtn.addEventListener("click", addTask);

// Enter key add
taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// Filter buttons
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    currentFilter = button.dataset.filter;
    renderTasks();
  });
});