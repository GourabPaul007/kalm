document.getElementById("sidebarOpenbtn").onclick = function () {
  openNav();
};

document.getElementById("closeSidebarBtn").onclick = function () {
  closeNav();
};

function openNav() {
  document.getElementById("sidebarBlock").style.width = "72px";
  chrome.storage.sync.set({ showSidebar: true });
  // document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("sidebarBlock").style.width = "0";
  chrome.storage.sync.set({ showSidebar: false });
  // document.getElementById("main").style.marginLeft = "0";
}
