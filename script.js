const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filters button");
const searchInput = document.getElementById("searchInput");

let tasks = [];
let currentFilter = "all";
let searchText = "";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");

  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }

  renderTasks();
}

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

  saveTasks();
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if (currentFilter === "completed") {
    filteredTasks = filteredTasks.filter(function (task) {
      return task.completed;
    });
  } else if (currentFilter === "pending") {
    filteredTasks = filteredTasks.filter(function (task) {
      return !task.completed;
    });
  }

  if (searchText !== "") {
    filteredTasks = filteredTasks.filter(function (task) {
      return task.text.toLowerCase().includes(searchText);
    });
  }

  if (filteredTasks.length === 0) {
    taskList.innerHTML = "<li>No tasks found</li>";
    return;
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

function toggleTask(id) {
  tasks = tasks.map(function (task) {
    if (task.id === id) {
      return {
        ...task,
        completed: !task.completed
      };
    }

    return task;
  });

  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });

  saveTasks();
  renderTasks();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    button.classList.add("active");
    currentFilter = button.dataset.filter;

    renderTasks();
  });
});

searchInput.addEventListener("input", function () {
  searchText = searchInput.value.toLowerCase();
  renderTasks();
});

loadTasks();