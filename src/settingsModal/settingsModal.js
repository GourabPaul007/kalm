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

// change font
document.getElementById("fontSelect").addEventListener("change", async (e) => {
  var font = new FontFace(
    e.target.value,
    `url(../../assets/fonts/${e.target.value}.ttf)`
  );
  await font
    .load()
    .then(function (loaded_face) {
      document.fonts.add(loaded_face);
      document.body.style.fontFamily = `${loaded_face.family}`;
    })
    .catch(function (error) {
      console.log("Something went wrong during font loading.", error);
    });
});
