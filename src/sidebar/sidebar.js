document.getElementById("sidebarOpenbtn").onclick = function () {
  console.log(document.getElementsByClassName("sidebar")[0].style.display);
  if (document.getElementsByClassName("sidebar")[0].style.display === "flex") {
    // document.getElementsByClassName("sidebar")[0].style.width = sidebarWidth;
    document.getElementsByClassName("sidebar")[0].style.display = "none";
  } else {
    // document.getElementsByClassName("sidebar")[0].style.width = "0px";
    document.getElementsByClassName("sidebar")[0].style.display = "flex";
  }
  // openNav();
};

// document.getElementById("sidebarCloseBtn").onclick = function () {
//   closeNav();
// };

document.getElementById("addLinkIconButton").onclick = function () {
  document.getElementsByClassName("addLinkModal")[0].style.display = "flex";
};
document.getElementById("cancelLink").onclick = function () {
  document.getElementsByClassName("addLinkModal")[0].style.display = "none";
};

// function openNav() {
//   document.getElementById("sidebarOpenbtn").style.display = "none";
//   document.getElementsByClassName("sidebar")[0].style.width = sidebarWidth;
//   chrome.storage.sync.set({ showSidebar: true });
//   // document.getElementById("main").style.marginLeft = "250px";
// }

// function closeNav() {
//   document.getElementById("sidebarOpenbtn").style.display = "block";
//   document.getElementsByClassName("sidebar")[0].style.width = "0px";
//   chrome.storage.sync.set({ showSidebar: false });
//   // document.getElementById("main").style.marginLeft = "0";
// }
