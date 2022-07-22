// Start Variables

let theInput = document.querySelector(".form input"),
    addButton = document.querySelector(".add"),
    tasksContainer = document.querySelector(".tasks"),
    tasksCount = document.querySelector(".tasks-num span"),
    tasksCompleted = document.querySelector(".completed span");

let tasksArray = [];

if (localStorage.getItem("tasks")) {

    tasksArray = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorage();

showMsg();

// End Variables

window.onload = function () {

    theInput.focus();
}

addButton.onclick = function () {

    addValue();
}

document.body.onkeyup = function(e) {

    if (e.key == "Enter") {

        addValue();
    }
}

document.body.addEventListener("click", function (e) {

    if (e.target.classList.contains("delete")) {

        deleteFromLocalStorage(e.target.parentElement.parentElement.getAttribute("data-id"));

        e.target.parentElement.parentElement.remove();

        tasksCounter();

        if (tasksContainer.childElementCount == 0) {

            showMsg();
        }
    }

    if (e.target.classList.contains("done")) {

        toggleLocalStorage(e.target.parentElement.parentElement.getAttribute("data-id"));

        e.target.parentElement.parentElement.classList.toggle("finished");

        tasksCounter();
    }

    if (e.target.classList.contains("delete-all")) {

        localStorage.clear();

        tasksContainer.innerHTML = "";

        showMsg();
    }
})

// Start Functions

function addValue() {

    if (theInput.value != "") {

        addTasksToArray(theInput.value);

        theInput.value = "";

        theInput.focus();
    }
}

function addTasksToArray(taskText) {

    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    }

    tasksArray.push(task);

    addTasksToPage(tasksArray);

    setDataToLocalStorage(tasksArray);
}

function addTasksToPage(array) {

    tasksContainer.innerHTML = "";

    array.forEach((task) => {

        // Main Div
        let taskDiv = document.createElement("div");
        taskDiv.setAttribute("data-id", task.id);
        taskDiv.className = "task-box";
        if (task.completed) {
            taskDiv.className = "task-box finished";
        }
        taskDiv.appendChild(document.createTextNode(task.title));

        // Delete Button
        let deleteButton = document.createElement("span");
        deleteButton.className = "delete";
        deleteButton.appendChild(document.createTextNode("Delete"));

        // Done Button
        let doneButton = document.createElement("span");
        doneButton.className = "done";
        doneButton.appendChild(document.createTextNode("Done"));

        // Main Span
        let mainSpan = document.createElement("span");
        mainSpan.className = "buttons";
        mainSpan.appendChild(deleteButton);
        mainSpan.appendChild(doneButton);

        // Final Steps
        taskDiv.appendChild(mainSpan);
        tasksContainer.appendChild(taskDiv);
        tasksCounter();
    })
}

function setDataToLocalStorage(array) {

    localStorage.setItem("tasks", JSON.stringify(array));
}

function getDataFromLocalStorage() {

    let data = localStorage.getItem("tasks");

    if (data) {

        let tasks = JSON.parse(data);

        addTasksToPage(tasks);
    }
}

function deleteFromLocalStorage(taskId) {

    tasksArray = tasksArray.filter((task) => task.id != taskId);

    setDataToLocalStorage(tasksArray);
}

function toggleLocalStorage(taskId) {

    for (let i = 0; i < tasksArray.length; i++) {

        if (tasksArray[i].id == taskId) {

            tasksArray[i].completed == false ? tasksArray[i].completed = true : tasksArray[i].completed = false;
        }
    }
    setDataToLocalStorage(tasksArray);
}

function showMsg() {

    if (tasksContainer.innerHTML == "") {

        let msgSpan = document.createElement("span");
        msgSpan.className = "no-task";
        msgSpan.appendChild(document.createTextNode("No Tasks To Show"));
        tasksContainer.appendChild(msgSpan);
    }
}

function tasksCounter() {

    tasksCount.textContent = document.querySelectorAll(".task-box").length;

    tasksCompleted.textContent = document.querySelectorAll(".finished").length;
}

// End Functions