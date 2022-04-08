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
  var font = new FontFace(e.target.value, `url(../../assets/fonts/${e.target.value}.ttf)`);
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
$("#timeFormatSelect").addEventListener("change", async (e) => {
  let settingsRepository = new SettingsRepository();
  settingsRepository.setTimeFormatToLocalDatabase(e.target.value);
});

$("#showSidebar").addEventListener("change", (e) => {
  let sidebarRepository = new SidebarRepository();
  if (e.target.checked) {
    sidebarRepository.setShowSidebar(1);
    new ShowOrHide().showSidebar();
  } else {
    sidebarRepository.setShowSidebar(0);
    new ShowOrHide().hideSidebar();
  }
});

$("#selectSidebarPosition").addEventListener("change", (e) => {
  let sidebarRepository = new SidebarRepository();
  switch (e.target.value) {
    case "left":
      $(".sidebar")[0].classList.remove("placeTop", "placeBottom", "placeRight");
      $(".sidebar")[0].classList.add("placeLeft");
      sidebarRepository.setSidebarPosition("left");
      break;
    case "right":
      $(".sidebar")[0].classList.remove("placeTop", "placeLeft", "placeBottom");
      $(".sidebar")[0].classList.add("placeRight");
      sidebarRepository.setSidebarPosition("right");
      break;
    case "top":
      $(".sidebar")[0].classList.remove("placeBottom", "placeLeft", "placeRight");
      $(".sidebar")[0].classList.add("placeTop");
      sidebarRepository.setSidebarPosition("top");
      break;
    case "bottom":
      $(".sidebar")[0].classList.remove("placeTop", "placeLeft", "placeRight");
      $(".sidebar")[0].classList.add("placeBottom");
      sidebarRepository.setSidebarPosition("bottom");
      break;
    default:
      $(".sidebar")[0].classList.remove("placeTop", "placeBottom", "placeRight");
      $(".sidebar")[0].classList.add("placeLeft");
      break;
  }
});

$(".tabs")[0].onclick = (e) => {
  // set all tab content to display none & tabs to not have bg color
  let tabs = $(".tabs")[0].children;
  for (let i = 0; i < tabs.length; i++) {
    $(`#${tabs[i].id}TabContent`).style.display = "none";
    $(`#${tabs[i].id}`).style.backgroundColor = "transparent";
  }
  // set clicked tab content to show & set selected tab to have bg color
  $(`#${e.target.id}`).style.backgroundColor = "#434343";
  $(`#${e.target.id}TabContent`).style.display = "block";
};

// $("#sidebarTabContent").onclick = (e) => {
//   $("sidebarTabContent").style.display = "none";
//   $("generalTabContent").style.display = "none";
// };

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
