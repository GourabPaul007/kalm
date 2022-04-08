$("#openTodoListButton").onclick = (e) => {
  console.log("clicked", e);
  let todoListModal = $("#todoListModal");
  if (todoListModal.style.display === "flex") {
    todoListModal.style.display = "none";
  } else {
    todoListModal.style.display = "flex";
  }
};

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "closeTodoModal";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var closeTodoModal = document.getElementsByClassName("closeTodoModal");
var i;
for (i = 0; i < closeTodoModal.length; i++) {
  closeTodoModal[i].onclick = function () {
    var div = this.parentElement;
    div.style.display = "none";
  };
}

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
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  console.log("inputValue: ", inputValue);
  if (inputValue) {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "closeTodoModal";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < closeTodoModal.length; i++) {
    closeTodoModal[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }
}
