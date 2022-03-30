// Get the settingsModal
// var settingsModal = document.getElementById("settingsModal");

// When the user clicks the button, open the settingsModal
document.getElementById("settingsBtn").onclick = function () {
  let settingsModal = document.getElementById("settingsModal");
  if (settingsModal.style.display === "flex") {
    settingsModal.style.display = "none";
  } else {
    settingsModal.style.display = "flex";
  }
  document.getElementById("settingsBtn").classList.toggle("rotate");
};

// when user clciks anything other than settings settingsModal, close it
document.getElementsByClassName("bg")[0].onclick = function (e) {
  let settingsModal = document.getElementById("settingsModal");
  if (!settingsModal.contains(e.target) && e.target.id !== "settingsBtn") {
    settingsModal.style.display = "none";
    document.getElementById("settingsBtn").classList.remove("rotate");
  }
};

// When the user clicks on <span> (x), close the settingsModal
document.getElementsByClassName("close")[0].onclick = function () {
  let settingsModal = document.getElementById("settingsModal");
  settingsModal.style.display = "none";
  document.getElementById("settingsBtn").classList.remove("rotate");
};

// When the user clicks anywhere outside of the settingsModal, close it
// window.onclick = function (event) {
//   if (event.target == settingsModal) {
//     let settingsModal = document.getElementById("settingsModal");
//     settingsModal.style.display = "none";
//   }
// };

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

// Change Time Format
document
  .getElementById("timeFormatSelect")
  .addEventListener("change", async (e) => {
    console.log(e.target.value);
    new SettingsRepository().setTimeFormatToLocalDatabase(e.target.value);
  });

// document.getElementById("openFile").onclick = async function () {
//   // [fileHandle] = await window.showOpenFilePicker();
//   let urlCreator = window.URL;
//   const dirHandle = await window.showDirectoryPicker();
//   for await (const entry of dirHandle.values()) {
//     let file = await entry.getFile();
//     let blob = await file.stream();
//     console.log(entry.kind, entry.name, file);
//     console.log(urlCreator.createObjectURL(blob));
//   }
// };
