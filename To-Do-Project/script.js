let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");


function displayTask(task){
    const li = document.createElement("li");

    const taskTextSpan = document.createElement("span");
    taskTextSpan.textContent = task.text;

    if(task.completed){
        taskTextSpan.classList.add("completed");
    }
    
    taskTextSpan.addEventListener("click", function(){
        task.completed = !task.completed;

        taskTextSpan.classList.toggle("completed");

        localStorage.setItem("tasks", JSON.stringify(tasks));
  });
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    li.appendChild(taskTextSpan);
    li.appendChild(deleteButton);

    deleteButton.addEventListener("click", function(){
        li.remove();

        tasks = tasks.filter(function(item){
            return tasks!== task;
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    taskList.appendChild(li);
}
tasks.forEach(function (task){
    displayTask(task);
});

addButton.addEventListener("click", function () {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const newTask ={
        text: taskText,
        completed: false
    };
    tasks.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTask(newTask);

    taskInput.value = "";
});
