// Get the settingsModal
// var settingsModal = $("#settingsModal");

// When the user clicks the button, open the settingsModal
$("#settingsBtn").onclick = function () {
  let settingsModal = $("#settingsModal");
  if (settingsModal.style.display === "flex") {
    settingsModal.style.display = "none";
  } else {
    settingsModal.style.display = "flex";
  }
  $("#settingsBtn").classList.toggle("rotate");
};

// when user clciks anything other than settings settingsModal, close it
$(".bg")[0].onclick = function (e) {
  let settingsModal = $("#settingsModal");
  if (!settingsModal.contains(e.target) && e.target.id !== "settingsBtn") {
    settingsModal.style.display = "none";
    $("#settingsBtn").classList.remove("rotate");
  }
};

// When the user clicks on <span> (x), close the settingsModal
$(".close")[0].onclick = function () {
  let settingsModal = $("#settingsModal");
  settingsModal.style.display = "none";
  $("#settingsBtn").classList.remove("rotate");
};

// When the user clicks anywhere outside of the settingsModal, close it
// window.onclick = function (event) {
//   if (event.target == settingsModal) {
//     let settingsModal = $("#settingsModal");
//     settingsModal.style.display = "none";
//   }
// };

// change font
$("#fontSelect").addEventListener("change", async (e) => {
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
    new SettingsRepository().setTimeFormatToLocalDatabase(e.target.value);
  });

// $("#openFile").onclick = async function () {
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
