$("#openTodoListButton").onclick = (e) => {
  let todoListModal = $("#todoListModal");
  if (todoListModal.style.display === "flex") {
    todoListModal.style.display = "none";
  } else {
    todoListModal.style.display = "flex";
  }
};

// Create a "close" button and append it to each list item
// var myNodelist = document.getElementsByTagName("LI");
// var i;
// for (i = 0; i < myNodelist.length; i++) {
//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");
//   span.className = "deleteTodoModal";
//   span.appendChild(txt);
//   myNodelist[i].appendChild(span);
// }

// Click on a close button to hide the current list item
// var deleteTodoButton = document.getElementsByClassName("deleteTodoButton");
// var i;
// for (i = 0; i < deleteTodoButton.length; i++) {
//   deleteTodoButton[i].onclick = function () {
//     var div = this.parentElement;
//     div.style.display = "none";
//   };
// }

// $(".deleteTodoButton").addEventListener("click", (e) => {
//   console.log(e);
// });

$("#myUL").addEventListener("click", (e) => {
  let todos = JSON.parse(localStorage.getItem("todos")) ?? [];
  for (let i = 0; i < todos.length; i++) {
    if (`todo${todos[i].id}` === e.target.parentElement.id) {
      todos.splice(todos.indexOf(todos[i]), 1);
      break;
    }
  }
  localStorage.setItem("todos", JSON.stringify(todos));
  loadTodos();
});

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector("ul");
list.addEventListener(
  "click",
  function (ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);

// Create a new list item when clicking on the "Add" button
$("#addNewElement").onclick = () => newElement();
function newElement() {
  let todos = JSON.parse(localStorage.getItem("todos")) ?? [];

  var inputValue = document.getElementById("myInput").value;
  if (inputValue) {
    let newTodo = {
      id: Date.now(),
      todo: inputValue,
    };
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    $("#myInput").value = "";
    loadTodos();
  }

  // for (i = 0; i < deleteTodoModal.length; i++) {
  //   deleteTodoModal[i].onclick = function () {
  //     var div = this.parentElement;
  //     div.style.display = "none";
  //   };
  // }
}

function loadTodos() {
  // remove old todos from dom
  let oldTodos = Array.from($("#myUL").children);
  for (let i = 0; i < oldTodos.length; i++) {
    console.log(oldTodos[i]);
    $("#myUL").removeChild(oldTodos[i]);
  }

  // add new todos to DOM
  let newTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
  if (newTodos.length == 0) return;
  for (let i = 0; i < newTodos.length; i++) {
    const element = newTodos[i];
    console.log("element: ", element);
    $("#myUL").insertAdjacentHTML(
      "beforeend",
      `
      <li id="todo${element.id}">
        ${element.todo}
        <span class="deleteTodoButton" id="deleteTodoButton${element.id}">\u00D7</span>
      </li>
      `
    );
  }
}
loadTodos();
