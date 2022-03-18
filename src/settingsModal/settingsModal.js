// Get the modal
var modal = document.getElementById("myModal");

// When the user clicks the button, open the modal
document.getElementById("settingsBtn").onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
document.getElementsByClassName("close")[0].onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
