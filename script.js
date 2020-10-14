const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.getElementById('filter');
const taskInput = document.getElementById('task');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event 
    taskList.addEventListener('click', removeTask);
    // Clear tasks
    clearBtn.addEventListener('click', removeAll);
    // Filter tasks event
    filter.addEventListener('keyup', filterTask);
}

// Add Task
function addTask(e) {
    e.preventDefault();
    if (taskInput.value === '') {
        // TODO Change this alert with a popup
        alert("Please enter a task")
    }
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);

    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = '';
}
//Store Task in local storage
function storeTaskInLocalStorage(task) {
    let tasks;
   
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log(tasks);
}

//Retrieve Tasks from  local storage on page loaded
function getTasks() {
     let tasks;
     if (localStorage.getItem('tasks') === null) {
         tasks = [];
     } else {
         tasks = JSON.parse(localStorage.getItem('tasks'));
     }
    tasks.forEach(function (task){
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
        
    });
}
// Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

            //! Removes permanently from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }   
    }
}

// Remove from local storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
   
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear All tasks
function removeAll(e) {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
// Clear tasks from Local Storage
    clearTasksFromLocalStorage();

}
 clearTasksFromLocalStorage => {
    localStorage.clear();
}

// Filtering through tasks 
function filterTask(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}