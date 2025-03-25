const filterType = document.getElementById("filter-type");
const startDateInput = document.getElementById("start-date");
const endDateInput = document.getElementById("end-date");
const customDateRange = document.getElementById("custom-date-range");
const generateReportBtn = document.getElementById("generate-report");
const totalHoursElement = document.getElementById("total-hours");
const reportResults = document.getElementById("report-results");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

filterType.addEventListener("change", () => {
    customDateRange.classList.toggle("hidden", filterType.value !== "custom");
    if (filterType.value !== "custom") {
        generateReport();
    }
});

generateReportBtn.addEventListener("click", generateReport);

function generateReport() {
    const filter = filterType.value;
    let startDate, endDate;

    if (filter === "week") {
        startDate = new Date();
        startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
    } else if (filter === "month") {
        startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
    } else if (filter === "custom") {
        startDate = new Date(startDateInput.value);
        endDate = new Date(endDateInput.value);
    } else {
        console.error("Invalid filter type");
        return;
    }

    let totalSeconds = 0;
    let filteredTasks = [];

    for (let task of tasks) {
        let taskDate = new Date(task.date);

        if (taskDate >= startDate && taskDate <= endDate) {
            filteredTasks.push(task);
        }
    }


    reportResults.innerHTML = "";

    for (let task of filteredTasks) {
        let taskElement = document.createElement("div");
        taskElement.innerHTML = `Task name: <strong>${task.taskName}</strong> - Project name: <strong>${task.projectName}</strong> - Time: <strong>${task.time}</strong>`;
        reportResults.appendChild(taskElement);

        let [hh, mm, ss] = task.time.split(":").map(Number);
        totalSeconds += hh * 3600 + mm * 60 + ss;
    }


    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    totalHoursElement.textContent = `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
}

function padTime(timeUnit) {
    return timeUnit < 10 ? "0" + timeUnit : timeUnit;
}

document.addEventListener("DOMContentLoaded", generateReport);
