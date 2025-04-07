document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('addTaskBtn').addEventListener('click', function() {
    const dateInput = document.getElementById('dateInput').value;
    const timeInput = document.getElementById('timeInput').value;
    const taskInput = document.getElementById('taskInput').value.trim();

    if (dateInput && timeInput && taskInput) {
        const task = {
            date: dateInput,
            time: timeInput,
            text: taskInput
        };

        saveTask(task);
        displayTasks();
        clearInputs();
    } else {
        alert('Please fill in all fields.');
    }
});

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    displayTasks();
}

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = `${task.date} ${task.time} - ${task.text}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function() {
            deleteTask(index);
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function clearInputs() 
{
    document.getElementById('dateInput').value = '';
    document.getElementById('timeInput').value = '';
    document.getElementById('taskInput').value = '';
}