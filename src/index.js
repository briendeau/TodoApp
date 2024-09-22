/* Problem: A todo app with priority options, project options, add, remove, and filtering.

The only way to create a working solution is to first understand the problem and think about how you want to try and solve it. Through experience in coding you will figure out everything you need to add to create a correct solution. Once you are sure you have the solution you can rewrite the solution text.
  Draft Solution:
  This is a ToDo app that uses objects for each todo, has a sidebar, and a section for displaying the todos.
  Each todo can be added using a modal button and on each todo card can be deleted.
  The sidebar can be toggled with a button on the left-side. The cards should show the objective, priority color,
  date, and a delete button. The cards can be added to projects by a checkbox in the modal.
  Projects are displayed in the sidebar and clear the content body and show them when clicked.
  Todo can be clicked on the left to clear the content and show the non-project todos.

  Divide page structure into 20% sidebar 80% content
  Create the sidebar option features we wish to have in a column
  Create a add todo button that opens a modal asking for data to create a todo object and populate a card.
  each card added from the modal must generate a card div.

  Real Solution:

*/

import "./style.css";
import "./menu-btn.svg";
import menuImg from "./menu-btn.svg";

console.log("test");

const container = document.getElementById("container");

let myMenuImg = new Image();
myMenuImg.src = menuImg;
myMenuImg.classList.add("menu-icon");

container.prepend(myMenuImg);

myMenuImg.addEventListener("click", () => {
  // sidebar.style.cssText = "display: none";
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("toggle");
});

// show modal when btn is clicked.
const dialog = document.getElementById("modalForm");
const createBtn = document.getElementById("create");
createBtn.addEventListener("click", () => {
  dialog.showModal();
});

// cancel button inside modal
const cancelBtn = document.getElementById("cancel");
cancelBtn.addEventListener("click", () => {
  dialog.close();
});

// add todo button inside modal
const modalAddBtn = document.getElementById("add");
modalAddBtn.addEventListener("click", () => {
  const dialog = document.getElementById("modalForm");
  getInputCreateTodos();
  displayTodo(todoArr);
  dialog.close();
});

// call create todo obj and display markup when addbtn is clicked.
function Todo(task, start, dateEnd, project, urgency, notes) {
  task = task;
  start = start;
  dateEnd = dateEnd;
  project = project;
  urgency = urgency;
  notes = notes;

  return { task, start, dateEnd, project, urgency, notes };
}

let todoArr = [];

function getInputCreateTodos() {
  let task = document.getElementById("task");
  if (task.value === "") {
    alert("Task field must not be empty.");
    return false;
  }
  console.log(task.value);
  let start = document.getElementById("start");
  console.log(start.value);
  let dateEnd = document.getElementById("date-end");
  console.log(dateEnd.value);
  let project = document.getElementById("project");
  console.log(project.value);
  let urgency = document.querySelector('input[name="fav_language"]:checked');
  if (urgency === null) {
    alert("A urgency button must be selected.");
    return false;
  }
  console.log(urgency.value);

  let notes = document.getElementById("notes");
  console.log(notes.value);
  let todo = Todo(
    task.value,
    start.value,
    dateEnd.value,
    project.value,
    urgency.value,
    notes.value
  );
  console.log(todo);
  console.log(todoArr);
  todoArr.push(todo);
}

function displayTodo(todoArr) {
  const results = document.getElementById("results");
  results.innerHTML = "";
  for (let todo of todoArr) {
    let card = document.createElement("div");
    let task = document.createElement("h2");
    let dateOne = document.createElement("h2");
    let dateTwo = document.createElement("h2");
    let project = document.createElement("h2");
    let urgency = document.createElement("h2");
    let notes = document.createElement("h2");
    let cardBtn = document.createElement("button");

    cardBtn.textContent = "Delete todo";
    // toggleBtn.textContent = book.read === "yes" ? "Mark Unread" : "Mark Read";
    task.textContent = "Todo: " + todo.task;
    dateOne.textContent = "Started: " + todo.start;
    dateTwo.textContent = "Deadline: " + todo.dateEnd;
    project.textContent = "Project: " + todo.project;
    urgency.textContent = "Urgency: " + todo.urgency;
    notes.textContent = "Notes: " + todo.notes;

    card.appendChild(task);
    card.appendChild(dateOne);
    card.appendChild(dateTwo);
    card.appendChild(project);
    card.appendChild(urgency);
    card.appendChild(notes);
    card.appendChild(cardBtn);
    results.appendChild(card);
    // using resultsDiv inherited styles but you can add more card specific classes here.
    card.className = "santa";

    // remove the card inside the results div when the remove btn is clicked and remove it from the array.
    cardBtn.addEventListener("click", (e) => {
      e.target.parentNode.remove();
      let indexTodo = todoArr.indexOf(todo);
      console.log(indexTodo);
      console.log(todoArr);
      todoArr.splice(indexTodo, 1);
      console.log(todoArr);
    });
  }
}

// project btn event listener, open modal, add value to select list for todo modal.
const projBtn = document.querySelector(".proj-btn");
console.log(projBtn);
const projDialog = document.getElementById("projectForm");
projBtn.addEventListener("click", () => {
  projDialog.showModal();
  projInput.value = "";
});

const projInput = document.getElementById("project");
const addProjBtn = document.getElementById("add-proj");
addProjBtn.addEventListener("click", () => {
  let projectVal = projInput.value;
  if (projectVal === "") {
    alert("Project named must not be empty.");
    return false;
  }
  // add the project to the select list as an option element
  let option = document.createElement("option");
  option.value = projectVal;
  let optionVal = option.value;
  console.log(optionVal);
  option.textContent = optionVal;
  console.log(option);
  let selectList = document.getElementById("projectSelect");
  selectList.appendChild(option);

  // also add the project to the sidebar list
  const ulSidebar = document.getElementById("proj-list");
  let li = document.createElement("li");
  li.innerHTML = "&#128366; " + projectVal;
  ulSidebar.appendChild(li);

  projDialog.close();
});

// function displayTodo() {
//   const resultEle = document.querySelector("#results");
// }
// add event listener to button beneath form to close dialog and add the todo object to the DOM.

// sidebar functionality, if label is clicked (eventlistener func), container innerHTML = "" then populate new cards.
