function myFunction() {
  alert("Hello World");
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("changeColor").addEventListener("click", function () {
    myFunction();
  });
});
