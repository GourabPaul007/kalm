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
  if (!addWidgetModal.contains(e.target)) {
    addWidgetModal.style.display = "none";
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

// On clicking left side tabs on settings
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

// ====================================================================================================================
// ====================================================================================================================
// ====================================================================================================================
// General Tab
// change font
$("#fontSelect").addEventListener("change", async (e) => {
  new SettingsRepository().setFont(e.target.value);
  let newFont = new SettingsRepository().getFont();
  var font = new FontFace(newFont, `url(../../assets/fonts/${newFont}.ttf)`);
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
  let clockRepository = new ClockRepository();
  clockRepository.setTimeFormat(e.target.value);
});

// ====================================================================================================================
// ====================================================================================================================
// ====================================================================================================================
// Clock Tab
// select clock type in clock-settings tab
$("#selectClockType").addEventListener("change", (e) => {
  let clockRepository = new ClockRepository();
  clockRepository.setClockType(e.target.value);
  initClockType(e.target.value); // clockService.js
});

// ====================================================================================================================
// ====================================================================================================================
// ====================================================================================================================
// Sidebar Tab
// show or hide sidebar
$("#showSidebar").addEventListener("change", (e) => {
  let sidebarRepository = new SidebarRepository();
  if (e.target.checked) {
    sidebarRepository.setShowSidebar(JSON.stringify(true));
    $("#sidebar").style.display = "flex";
  } else {
    sidebarRepository.setShowSidebar(JSON.stringify(false));
    $("#sidebar").style.display = "none";
  }
});

// sidebar position change
$("#selectSidebarPosition").addEventListener("change", (e) => {
  let sidebarRepository = new SidebarRepository();
  switch (e.target.value) {
    case "left":
      $("#sidebar").classList.remove("placeTop", "placeBottom", "placeRight");
      $("#sidebar").classList.add("placeLeft");
      sidebarRepository.setSidebarPosition("left");
      break;
    case "right":
      $("#sidebar").classList.remove("placeTop", "placeLeft", "placeBottom");
      $("#sidebar").classList.add("placeRight");
      sidebarRepository.setSidebarPosition("right");
      break;
    case "top":
      $("#sidebar").classList.remove("placeBottom", "placeLeft", "placeRight");
      $("#sidebar").classList.add("placeTop");
      sidebarRepository.setSidebarPosition("top");
      break;
    case "bottom":
      $("#sidebar").classList.remove("placeTop", "placeLeft", "placeRight");
      $("#sidebar").classList.add("placeBottom");
      sidebarRepository.setSidebarPosition("bottom");
      break;
    default:
      $("#sidebar").classList.remove("placeTop", "placeBottom", "placeRight");
      $("#sidebar").classList.add("placeLeft");
      break;
  }
});

// $("#showYoutube").addEventListener("change",(e)=>{
//   if (e.target.checked) {

//   }
// })
