document.getElementById("apps").addEventListener("click", () => {
  alert("bruh");
});

chrome.storage.sync.get("showSidebar", ({ showSidebar }) => {
  // changeColor.style.backgroundColor = color;
  let width = "0px";
  if (showSidebar === false) {
    width = "0px";
  } else {
    width = "72px";
  }
  document.getElementById("sidebarBlock").style.width = width;
});
