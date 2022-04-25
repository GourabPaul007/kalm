function makeTodo({ id, todo, isChecked, category }) {
  return {
    id: id ?? `todo${Date.now()}`,
    todo: todo ?? "",
    isChecked: isChecked ?? false,
    category: category ?? "today123",
  };
}

// Open Todo List on clicking todo in bottom right
$("#openTodoListButton").onclick = (e) => {
  let todoListModal = $("#todoListModal");
  if (todoListModal.style.display === "flex") {
    todoListModal.style.display = "none";
  } else {
    todoListModal.style.display = "flex";
    $("#todoCategoriesSection").classList.remove("showTodoCategoriesSection");
  }
};

// Close Todo List on clicking close icon in todo list modal
$("#todoListCloseButton").onclick = () => {
  todoListModal.style.display = "none";
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
$("#addNewTodo").onclick = () => newElement();

// Create a new todo when pressing enter key after typing a new todo
$("#todoInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    newElement();
  }
});

function newElement() {
  let todos = JSON.parse(localStorage.getItem("todos")) ?? [];

  var inputValue = $("#todoInput").value;
  let title = $(".todoTitle")[0].innerText;
  let category = $(".todoTitle")[0].id;
  console.log("title:", title);
  console.log("category:", category);
  if (inputValue) {
    let newTodo = makeTodo({
      id: `todo${Date.now()}`,
      todo: inputValue,
      isChecked: false,
      category: category,
    });

    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    $("#todoInput").value = "";
    loadTodos(category);
  }
}

function loadTodos(category) {
  // remove old todos from DOM
  let oldTodos = Array.from($("#myUL").children);
  for (let i = 0; i < oldTodos.length; i++) {
    $("#myUL").removeChild(oldTodos[i]);
  }
  // add new todos to DOM
  let todos = JSON.parse(localStorage.getItem("todos")) ?? [];
  let displayTodos = [];
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    if (category === todo.category) {
      displayTodos.push(todo);
    }
  }
  if (displayTodos.length == 0) return;
  for (let i = 0; i < displayTodos.length; i++) {
    const element = displayTodos[i];
    $("#myUL").insertAdjacentHTML(
      "beforeend",
      `
      <li id="${element.id}" class="${element.isChecked ? "checked" : ""} ">
        ${element.todo}
        <span class="deleteTodoButton" id="deleteTodoButton${element.id}">\u00D7</span>
      </li>
      `
    );
  }
}
loadTodos("today123");

// Load the todo Categories in the todo categories modal
function loadTodoCategories() {
  let todoListCategories = JSON.parse(localStorage.getItem("todoListCategories"));
  let todoUL = document.createElement("ul");
  todoListCategories.forEach((element) => {
    let todoLI = document.createElement("li");
    todoLI.id = element.id;
    let todoLIText = document.createElement("span");
    todoLIText.innerText = element.name;
    todoLI.append(todoLIText);
    todoLI.insertAdjacentHTML("beforeend", "<i class='bi bi-three-dots todoCategoryLIMoreOptions'></i>");
    todoUL.appendChild(todoLI);
  });
  // $("#todoCategoriesSection").removeChild($("#todoCategoriesSection").children[0]);
  $("#todoCategoriesSection").replaceChildren(todoUL);
  // todoListCategories[0].name;
}
loadTodoCategories();

// Open the list of todo categories section/ add a new todo category
$("#openTodoCategoryButton").onclick = () => {
  $("#todoCategoriesSection").classList.toggle("showTodoCategoriesSection");
};

// On Click inside todo category section to open todos of the selected category
$("#todoCategoriesSection").onclick = (e) => {
  if (e.target.closest("li") && !e.target.classList.contains("todoCategoryLIMoreOptions")) {
    console.log(e.target.id);
    $(".todoTitle")[0].innerText = `${e.target.innerText} `; //name the new todo-category title
    $(".todoTitle")[0].id = e.target.id; //name the new todo-category id
    $("#todoCategoriesSection").classList.toggle("showTodoCategoriesSection"); // hide the todo-categories section
    loadTodos(e.target.id); // Load todos of the selected category
    // TODO: show the todos for only the selected category & when entering a new todo, add the category to it
  } else if (e.target.classList.contains("todoCategoryLIMoreOptions")) {
    console.log(e.target);
    // TODO: add delete/edit todo category modal option
  }
};

// $("#todoCategoriesSection").onclick = (e) => {
//   if (e.target.classList.contains("todoCategoryLIMoreOptions")) {
//     console.log(e.target);
//     console.log("bruh");
//   }
// };
