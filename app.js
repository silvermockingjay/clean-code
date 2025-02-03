//Document is the DOM can be accessed in the console with document.window.
//Tree is from the top, html, body, p etc.
//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.
var taskInput = document.querySelector(".section__input_task-new"); 
var addButton = document.querySelector(".section__btn"); 
var incompleteTaskHolder = document.querySelector(".section__list_incomplete"); 
var completedTasksHolder = document.querySelector(".section__list_complete"); 

//New task list item
var createNewTaskElement = function(taskString){
    //Create elements
    var listItem = document.createElement("li");
    var checkBox = document.createElement("input");
    var label = document.createElement("label");
    var editInput = document.createElement("input");
    var editButton = document.createElement("button");
    var deleteButton = document.createElement("button");
    var deleteButtonImg = document.createElement("img");

    //Set attributes and classes for the elements
    listItem.className = "section__list-item";
    label.innerText = taskString;
    label.className = "section__task";
    checkBox.type = "checkbox";
    checkBox.className = "section__checkbox";
    editInput.type = "text";
    editInput.classList.add("section__input", "section__input_save");
    editButton.innerText = "Edit";
    editButton.classList.add("section__btn", "section__btn_edit");
    deleteButton.classList.add("section__btn", "section__btn_delete");
    deleteButtonImg.src = "./remove.svg";
    deleteButtonImg.className = "section__delete-icon";
    deleteButton.appendChild(deleteButtonImg);

    //Append elements to the list item
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

var addTask = function(){
    console.log("Add Task...");

    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
}

//Edit an existing task
var editTask = function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");
    var listItem = this.parentNode;
    var editInput = listItem.querySelector(".section__input");
    var label = listItem.querySelector("label");
    var editBtn = listItem.querySelector(".section__btn_edit");
    var containsClass = listItem.classList.contains("section__list-item_edit");

    //If class of the parent is section__list-item_edit
    if(containsClass){

        //Switch to edit mode, label becomes the inputs value
        label.innerText = editInput.value;
        label.classList.remove("section__task_edit");
        editInput.classList.remove("section__input_edit");
        editBtn.innerText = "Edit";
    }else{
        label.classList.add("section__task_edit");
        editInput.classList.add("section__input_edit");
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    //Toggle section__list-item_edit on the parent.
    listItem.classList.toggle("section__list-item_edit");
};


//Delete task
var deleteTask = function(){
    console.log("Delete Task...");
    var listItem = this.parentNode;
    var ul = listItem.parentNode;

    //Remove the parent list item from the ul.
    ul.removeChild(listItem);
};


//Mark task completed
var taskCompleted = function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    var label = this.nextElementSibling;
    label.classList.add("section__task_complete");
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function(){
    console.log("Incomplete Task...");

    /* Mark task as incomplete
     * When the checkbox is unchecked
     * Append the task list item to the #incompleteTasks */
    var listItem = this.parentNode;
    var label = this.nextElementSibling;
    label.classList.remove("section__task_complete");
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

var ajaxRequest=function(){
    console.log("AJAX Request");
}

/* The glue to holds it all together
 * Set the click handler to the addTask function */
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");

    //Select list items children
    var checkBox = taskListItem.querySelector(".section__checkbox");
    var editButton = taskListItem.querySelector(".section__btn_edit");
    var deleteButton = taskListItem.querySelector(".section__btn_delete");

    //Bind editTask to edit button
    editButton.onclick = editTask;

    //Bind deleteTask to delete button
    deleteButton.onclick = deleteTask;

    //Bind taskCompleted to checkBoxEventHandler
    checkBox.onchange = checkBoxEventHandler;
}

//Cycle over incompleteTaskHolder ul list items
for (var i = 0; i < incompleteTaskHolder.children.length; i++){

    //Bind events to list items children(section__list_complete)
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//Cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++){

    //Bind events to list items children(section__list_incomplete)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

//Issues with usability don't get seen until they are in front of a human tester
//Prevent creation of empty tasks
//Change edit to save when you are in edit mode