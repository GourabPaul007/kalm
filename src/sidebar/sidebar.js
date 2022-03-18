document.getElementById("sidebarOpenbtn").onclick = function () {
  openNav();
};

document.getElementById("sidebarCloseBtn").onclick = function () {
  closeNav();
};

function openNav() {
  document.getElementById("sidebarOpenbtn").style.display = "none";
  document.getElementById("sidebarBlock").style.width = "56px";
  chrome.storage.sync.set({ showSidebar: true });
  // document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("sidebarOpenbtn").style.display = "block";
  document.getElementById("sidebarBlock").style.width = "0";
  chrome.storage.sync.set({ showSidebar: false });
  // document.getElementById("main").style.marginLeft = "0";
}
