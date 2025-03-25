const mainWrapper = document.getElementById("main-wrapper");
const nameInput = document.getElementById("project-name-input");
const addProjectButton = document.getElementById("add-project-button");

let projectListWrapper = document.createElement("div");
projectListWrapper.id = "project-list-wrapper";

let projects = JSON.parse(localStorage.getItem("projects")) || [];
showProjects();

addProjectButton.addEventListener("click", function addProject() {

    const id = Date.now();

    if (nameInput.value.trim() === "") return;

    projects.push({
        id: id,
        name: nameInput.value
    });

    localStorage.setItem("projects", JSON.stringify(projects));

    nameInput.value = "";
    showProjects();

});

function showProjects() {

    projectListWrapper.innerHTML = "";


    if (projects.length > 0) {
        for(project of projects) {
            let projectDiv = document.createElement("div"); //
            projectDiv.classList.add("project-item");
            projectDiv.setAttribute("data-task-id", project.id);

            let projectName = document.createElement("h3");
            projectName.classList.add("project-list-item");
            projectName.innerText = "• " + project.name;

            let deleteProjectButton = document.createElement("button");
            deleteProjectButton.setAttribute("type", "button");
            deleteProjectButton.classList.add("delete-project");
            deleteProjectButton.innerText = "Delete project";

            deleteProjectButton.addEventListener("click", (function (id) {
                return function () {
                    projects = projects.filter(filterProjects => filterProjects.id !== id);
                    localStorage.setItem("projects", JSON.stringify(projects));
                    showProjects();
                };
            })(project.id));


            projectDiv.append(projectName, deleteProjectButton);
            projectListWrapper.append(projectDiv);
        }
    }

    mainWrapper.appendChild(projectListWrapper);
}

