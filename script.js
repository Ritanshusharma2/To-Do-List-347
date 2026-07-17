const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>
            <i class="fa-solid fa-trash delete"></i>
        `;

        li.addEventListener("click",function(e){

            if(e.target.classList.contains("delete")) return;

            tasks[index].completed=!tasks[index].completed;

            saveTasks();

            renderTasks();

        });

        li.querySelector(".delete").addEventListener("click",function(){

            tasks.splice(index,1);

            saveTasks();

            renderTasks();

        });

        taskList.appendChild(li);

    });

}

function addTask(){

    const text=input.value.trim();

    if(text==="") return;

    tasks.push({

        text:text,

        completed:false

    });

    input.value="";

    saveTasks();

    renderTasks();

}

addBtn.addEventListener("click",addTask);

input.addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        addTask();

    }

});

renderTasks();