import {getCurrentDate} from "./helpers/dateHelper";

const stopwatch = document.getElementById("stopwatch");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

let taskInput = document.getElementById("task-name-input");
let startBtn = document.getElementById("start-button");
let stopBtn = document.getElementById("stop-button");
let projectSelector = document.getElementById("project-selector");
let taskListWrapper = document.getElementById("task-list-wrapper");
let addProjectBtn = document.getElementById("add-project-button");
let projectInput = document.getElementById("project-name-input");

let currentDate = getCurrentDate();


let projects = JSON.parse(localStorage.getItem("projects")) || [];
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function fillProjectSelector() {

    for (let project of projects){
        let projectOption = document.createElement("option");
        projectOption.innerText = project.name;
        projectSelector.append(projectOption);
        console.log(projectOption.innerText);
    }
}
fillProjectSelector();

startBtn.addEventListener("click", () => {
    if (!isRunning) {
        elapsedTime = 0;
        startTime = Date.now();
        timer = setInterval(update, 10);
        isRunning = true;
        localStorage.removeItem("time");
        stopBtn.classList.remove("hidden");
        startBtn.classList.add("hidden");
    }
});

stopBtn.addEventListener("click", () => {

    const id = Date.now();

    if (taskInput.value.trim() === "") return;

    tasks.push({
        id: id,
        taskName: taskInput.value,
        projectName: projectSelector.value,
        time: stopwatch.textContent,
        date: currentDate
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    stopBtn.classList.add("hidden");
    startBtn.classList.remove("hidden");

    showTasks();

});

function showTasks(){

    taskListWrapper.innerHTML = '';

    clearInterval(timer);
    elapsedTime = Date.now() - startTime;
    isRunning = false;

    for (let task of tasks){

        let taskWrapper = document.createElement("div");
        taskWrapper.id = "task-wrapper";

        let taskName = document.createElement("h3");
        taskName.id = "task-name";
        taskName.innerText = task.taskName;

        let projectName = document.createElement("p");
        projectName.id = "project-name";
        projectName.innerText = task.projectName;

        let taskTime = document.createElement("p");
        taskTime.id = "task-time";
        taskTime.innerText = task.time;

        let deleteTaskButton = document.createElement("button");
        deleteTaskButton.setAttribute("type", "button");
        deleteTaskButton.innerText = "Delete task";

        deleteTaskButton.addEventListener("click", (function (id) {
            return function () {
                tasks = tasks.filter(filterTasks => filterTasks.id !== id);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                showTasks();
            };
        })(task.id));

        taskWrapper.append(taskName, projectName, taskTime, deleteTaskButton);
        taskListWrapper.append(taskWrapper);

        clearInterval(timer);
        startTime = 0;
        elapsedTime = 0;
        isRunning = false;
        stopwatch.innerText = "00:00:00";
        taskInput.value = "";
    }
}


function update(){

    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime  / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime  / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime  / 1000 % 60);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    stopwatch.textContent = `${hours}:${minutes}:${seconds}`;

}

addProjectBtn.addEventListener("click", () => {

    let projectOption  = document.createElement("option");
    projectOption.innerText = projectInput.value;

    projectSelector.append(projectOption);

    const id = Date.now();

    projects.push({
        id: id,
        name: projectInput.value
    });

    localStorage.setItem("projects", JSON.stringify(projects));

});

document.addEventListener("DOMContentLoaded", showTasks);
