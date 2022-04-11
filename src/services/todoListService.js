function makeTodo({ id, todo, isChecked }) {
  return {
    id: id ?? `todo${Date.now()}`,
    todo: todo ?? "",
    isChecked: isChecked ?? false,
  };
}

$("#openTodoListButton").onclick = (e) => {
  let todoListModal = $("#todoListModal");
  if (todoListModal.style.display === "flex") {
    todoListModal.style.display = "none";
  } else {
    todoListModal.style.display = "flex";
  }
};

$("#myUL").addEventListener("click", (e) => {
  let todos = JSON.parse(localStorage.getItem("todos")) ?? [];
  // If clicked on the li element of todo, make the todo crossed & vice versa
  if (e.target.tagName === "LI") {
    let todos = JSON.parse(localStorage.getItem("todos")) ?? [];
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id == e.target.id) {
        todos[i].isChecked = !todos[i].isChecked;
      }
    }
    localStorage.setItem("todos", JSON.stringify(todos));
    e.target.classList.toggle("checked");
  }
  // If clicked on the delete button, delete the todo
  else if (e.target.className === "deleteTodoButton") {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === e.target.parentElement.id) {
        todos.splice(todos.indexOf(todos[i]), 1);
        break;
      }
    }
    localStorage.setItem("todos", JSON.stringify(todos));
    loadTodos();
  }
});

// Create a new todo item when clicking on the "Add" button
$("#addNewElement").onclick = () => newElement();
function newElement() {
  let todos = JSON.parse(localStorage.getItem("todos")) ?? [];

  var inputValue = document.getElementById("myInput").value;
  if (inputValue) {
    let newTodo = makeTodo({
      id: `todo${Date.now()}`,
      todo: inputValue,
      isChecked: false,
    });

    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    $("#myInput").value = "";
    loadTodos();
  }
}

function loadTodos() {
  // remove old todos from DOM
  let oldTodos = Array.from($("#myUL").children);
  for (let i = 0; i < oldTodos.length; i++) {
    $("#myUL").removeChild(oldTodos[i]);
  }
  // add new todos to DOM
  let newTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
  if (newTodos.length == 0) return;
  for (let i = 0; i < newTodos.length; i++) {
    const element = newTodos[i];
    $("#myUL").insertAdjacentHTML(
      "beforeend",
      `
      <li id="${element.id}" ${element.isChecked ? "class='checked'" : ""}>
        ${element.todo}
        <span class="deleteTodoButton" id="deleteTodoButton${element.id}">\u00D7</span>
      </li>
      `
    );
  }
}
loadTodos();
