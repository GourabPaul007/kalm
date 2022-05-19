function makeTodo({ id, todo, isChecked, categoryId, categoryName }) {
  return {
    id: id ?? `todo${Date.now()}`,
    todo: todo ?? "",
    isChecked: isChecked ?? false,
    categoryId: categoryId ?? "today123",
    categoryName: categoryName ?? "Today",
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

// Crossing or Deleting Todos
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
    loadTodos(todos[i].categoryId, todos[i]);
  }
});

// Create a new todo item when clicking on the "Add" button
$("#addNewTodo").onclick = () => newTodoElement();

// Create a new todo when pressing enter key after typing a new todo
$("#todoInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    newTodoElement();
  }
});

function newTodoElement() {
  let todos = JSON.parse(localStorage.getItem("todos")) ?? [];

  var inputValue = $("#todoInput").value;
  let title = $(".todoTitle")[0].innerText;
  let categoryId = $(".todoTitle")[0].id;
  if (inputValue) {
    let newTodo = makeTodo({
      id: `todo${Date.now()}`,
      todo: inputValue,
      isChecked: false,
      categoryId: categoryId,
      categoryName: title,
    });

    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    $("#todoInput").value = "";
    loadTodos(categoryId, title);
  }
}

function loadTodos(categoryId, categoryName) {
  // add the category Name on top of todos(in the header)
  $(".todoTitle")[0].innerText = `${categoryName} `;
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
    if (categoryId === todo.categoryId) {
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
loadTodos("today123", "Today");

// Load the todo Categories in the todo categories modal
function loadTodoCategories() {
  let todoCategories = JSON.parse(localStorage.getItem("todoCategories")) ?? [];
  let todoUL = document.createElement("ul");
  todoUL.id = "todoCategoriesUL";
  todoCategories.forEach((element) => {
    let todoLI = document.createElement("li");
    todoLI.id = element.id;
    let todoLIText = document.createElement("span");
    todoLIText.innerText = element.name;
    todoLI.append(todoLIText);
    // DONT PUT THE MORE-OPTIONS ICON IN TODAY CATEGORY
    if (element.id !== "today123") {
      todoLI.insertAdjacentHTML("beforeend", "<i class='bi bi-three-dots todoCategoryLIMoreOptions'></i>");
    }
    todoUL.appendChild(todoLI);
  });
  // $("#todoCategoriesSection").removeChild($("#todoCategoriesSection").children[0]);
  // $("#todoCategoriesSection").replaceChild($("#todoCategoriesUL"), todoUL);
  $("#todoCategoriesUL").replaceWith(todoUL);
  // todoCategories[0].name;
}
loadTodoCategories();

// Open the list of todo categories section/ add a new todo category
$("#openTodoCategoryButton").onclick = () => {
  $("#todoCategoriesSection").classList.toggle("showTodoCategoriesSection");
  $("#moreOptionsDialogTodoCategory").classList.remove("showTodoMoreOptions");
  loadTodoCategories();
};

// On Click inside todo category section to open todos of the selected category
$("#todoCategoriesSection").onclick = (e) => {
  if (e.target.closest("li") && !e.target.classList.contains("todoCategoryLIMoreOptions")) {
    console.log(e.target.id);
    $(".todoTitle")[0].innerText = `${e.target.innerText} `; //name the new todo-category title
    $(".todoTitle")[0].id = e.target.id; //name the new todo-category id
    $("#todoCategoriesSection").classList.toggle("showTodoCategoriesSection"); // hide the todo-categories section
    loadTodos(e.target.id, e.target.innerText); // Load todos of the selected category
  } else if (e.target.classList.contains("todoCategoryLIMoreOptions")) {
    console.log(e.target);
    let moreOptionsDialog = $("#moreOptionsDialogTodoCategory");
    moreOptionsDialog.classList.toggle("showTodoMoreOptions");
    moreOptionsDialog.style.top = `${e.clientY - 40}px`;
    moreOptionsDialog.style.left = `${e.clientX - 80}px`;
    // ON CLICKING THE EDIT BUTTON
    $("#editTodoCategoryButton").onclick = () => {
      let todoCategories = JSON.parse(localStorage.getItem("todoCategories"));
      let editTodoCategoryInputArea = $("#editTodoCategoryInputArea");
      // this filter returns the todo category that matches the id
      let toBeEditedTodoCategory = todoCategories.filter((x) => x.id === e.target.parentElement.id)[0];
      if (editTodoCategoryInputArea.style.display === "flex") {
        editTodoCategoryInputArea.style.display = "none";
      } else {
        editTodoCategoryInputArea.style.display = "flex";
        newTodoCategoryInputArea.style.top = `${e.clientY - 10}px`;
        newTodoCategoryInputArea.style.left = `${e.clientX - 80}px`;

        moreOptionsDialog.classList.remove("showTodoMoreOptions"); // REMOVE THE EDIT/DELETE MODAL
        $("#todoCategoriesSection").classList.remove("showTodoCategoriesSection"); // REMOVE THE todoCategoriesSection MODAL
        $("#editTodoCategoryInput").value = toBeEditedTodoCategory.name;
        // UPDATE AND SAVE THE CATEGORY
        $("#updateTodoCategoryBtn").onclick = () => {
          // Iterate through all the categories and update the one with correct id
          for (let i = 0; i < todoCategories.length; i++) {
            if (todoCategories[i].id === toBeEditedTodoCategory.id) {
              todoCategories[i].name = $("#editTodoCategoryInput").value;
              localStorage.setItem("todoCategories", JSON.stringify(todoCategories));
              break;
            }
          }
          // CLEAN UP
          editTodoCategoryInputArea.style.display = "none";
          moreOptionsDialog.classList.remove("showTodoMoreOptions");
        };
      }
    };
    // ON CLICKING THE DELETE BUTTON
    $("#deleteTodoCategoryButton").onclick = () => {
      let todoCategories = JSON.parse(localStorage.getItem("todoCategories"));
      let newTodoCategories = todoCategories.filter((x) => x.id !== e.target.parentElement.id);
      localStorage.setItem("todoCategories", JSON.stringify(newTodoCategories));
      // remove the edit/delete modal after deletion of a category
      moreOptionsDialog.classList.remove("showTodoMoreOptions");
      // remove the todo-categories section after deletion of a category
      $("#todoCategoriesSection").classList.remove("showTodoCategoriesSection");
      // show the Today category todos after deleting the todo category
      loadTodos("today123", "Today");
      $(".todoTitle")[0].id = "today123";
    };
    // TODO: add add/edit todo category modal option
  }
};

// ADD NEW TODO CATEGORY ON CLICKING THE 'addNewTodoCategory' ICONBUTTON
$("#addNewTodoCategory").onclick = (e) => {
  let newTodoCategoryInputArea = $("#newTodoCategoryInputArea");
  if (newTodoCategoryInputArea.style.display === "flex") {
    newTodoCategoryInputArea.style.display = "none";
  } else {
    newTodoCategoryInputArea.style.display = "flex";
    newTodoCategoryInputArea.style.top = `${e.clientY - 100}px`;
    newTodoCategoryInputArea.style.left = `${e.clientX - 80}px`;
    $("#addTodoCategoryBtn").onclick = () => {
      let todoCategories = JSON.parse(localStorage.getItem("todoCategories")) ?? [];
      let newTodoCategoryName = $("#newTodoCategoryInput").value;
      let newTodoCategoryId = `todoCategory${Date.now()}`;
      if (!newTodoCategoryName || newTodoCategoryName == "") return;
      todoCategories.push({
        id: newTodoCategoryId,
        name: newTodoCategoryName,
      });
      localStorage.setItem("todoCategories", JSON.stringify(todoCategories));
      loadTodos(newTodoCategoryId, newTodoCategoryName);
      $(".todoTitle")[0].innerText = `${newTodoCategoryName} `;
      $(".todoTitle")[0].id = newTodoCategoryId;
      // Clearing up stuff
      $("#newTodoCategoryInput").value = "";
      newTodoCategoryInputArea.style.display = "none";
    };
  }
};

// $("#todoCategoriesSection").onclick = (e) => {
//   if (e.target.classList.contains("todoCategoryLIMoreOptions")) {
//     console.log(e.target);
//     console.log("bruh");
//   }
// };
