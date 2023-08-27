const taskContainer = document.querySelector('.tasks');
const input = document.querySelector('.input');
const addBtn = document.querySelector('.addBtn');
const form = document.querySelector('form');
const taskCount = document.querySelector('.taskCount');

let count = 0;

form.addEventListener('submit', e => {
    e.preventDefault();
    addTask();

    taskCount.innerHTML = count;
});

//Check if todo is existing on localstorage and display them
const todos = JSON.parse(localStorage.getItem('todo'));
if(todos){
    todos.forEach(task =>{
        addTask(task);
    });
}

//Update task count
taskCount.innerHTML = count;

function addTask(todo){
    let taskEl;
    let inputValue = input.value;

    if(!todo && inputValue === ''){
        alert('Input is empty');
        return;
    }

    //check if todo is existing
    if(todo){
        inputValue = todo.task;
    }

    //Check if task is completed
    if(todo && todo.isCompleted){
        taskEl = document.createElement('li');
        taskEl.classList.add('completed');
    }else{
        taskEl = document.createElement('li');
    }

    taskEl.innerHTML = inputValue + `<button class="delBtn">
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                <style>
                svg {
                        fill: #ffffff
                    }
                </style>
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
            </svg></i></button>`;

    taskContainer.appendChild(taskEl);

    //Clear input
    input.value = '';

    //Mark Completed Task
    taskEl.addEventListener('click', e => {
        taskEl.classList.toggle('completed');
        updateLst();
    }); 

    //Right Click Task
    taskEl.addEventListener('contextmenu', e => {
        e.preventDefault();
        taskEl.querySelector('.delBtn').classList.toggle('showDelete');
    })

    //Swipe
    taskEl.addEventListener('swiped-left', function (e) {
        e.preventDefault();
        taskEl.querySelector('.delBtn').classList.toggle('showDelete');
    });

    //Delete Task
    taskEl.querySelector('.delBtn').addEventListener('click', e => {
        e.preventDefault();

        taskEl.classList.toggle('deleting');
        setTimeout(() =>{
            taskEl.remove();
            updateLst();
        }, 300);
        
        count--;
        taskCount.innerHTML = count;
    });

    count++;
    updateLst();
}

function updateLst(){
    const todoEl = document.querySelectorAll('li');

    const tasks = [];

    todoEl.forEach(task => {
        tasks.push({
            task: task.innerText,
            isCompleted: task.classList.contains('completed')
        });
    });

    localStorage.setItem('todo', JSON.stringify(tasks));
}