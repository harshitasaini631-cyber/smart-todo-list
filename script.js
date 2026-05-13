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

// Add task
function addTask() {
  const text = taskInput.value.trim();

  if (text === "") {
    alert("Please enter a task");
    return;
  }

  tasks.push(newTask);
  taskInput.value = "";

  saveTasks();
  renderTasks();

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
    saveTasks();
    renderTasks();
    return task;
  });

  renderTasks();
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;

  });
  saveTasks();
  renderTasks();
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