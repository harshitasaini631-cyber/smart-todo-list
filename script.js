const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filters button");

let tasks = [];

function addTask(){
    const text = taskInput.value.trim();

    if(text === ""){
        alert("Please enter a task");
        return;
    } 

    const newTask = {
          id = Date.now(),
          text = text,
          completed = false,

    };

    tasks.push(newTask);
    taskInput.value = "";
    renderTasks();
}

// add task by clicking 
addBtn.addEventListener("click", addTask);

// add task also by enter key
taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// rendertasks sync screen with data. updates ui everytime a change is
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function (task) {
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
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  renderTasks();
}