const sidebarWidth = "128px";

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.sync.set({ color });
// });

// chrome.action.onClicked.addListener(function (activeTab) {
//   let newURL = "http://www.youtube.com/watch?v=oHg5SJYRHA0";
//   let newURL1 = "chrome://newTab";
//   chrome.tabs.create({ url: newURL1 });
//   //   window.open("chrome://newTab", "_blank");
//   // chrome.tabs.create(
//   //   { url: chrome.extension.getURL("chrome://newTab") },
//   //   function (tab) {
//   //     // Tab opened.
//   //   }
//   // );
// });

// set the showSidebar to false on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ showSidebar: false });
  // localStorage.setItem("clockType", digital);
  // localStorage.setItem("timeFormat", 12);
  // localStorage.setItem("showSidebar", true);
  // localStorage.setItem("timeFormat", "12");
  // chrome.storage.sync.set({ links: [] });
});

// get the showSidebar on runtime
// chrome.storage.sync.get("showSidebar", ({ showSidebar }) => {
//   let width = "0px";
//   let sidebarOpenbtnDisplay = "block";
//   if (showSidebar === false) {
//     width = "0px";
//     sidebarOpenbtnDisplay = "block";
//   } else {
//     width = sidebarWidth;
//     sidebarOpenbtnDisplay = "none";
//   }
//   document.getElementsByClassName("sidebar")[0].style.width = width;
//   document.getElementById("sidebarOpenbtn").style.display =
//     sidebarOpenbtnDisplay;
// });

// chrome.storage.sync.clear();
