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

// get the time and show it on each second
chrome.alarms.create({ periodInMinutes: 1 / 60 });
chrome.alarms.onAlarm.addListener(() => {
  let date = new Date();
  let timeFormat = 24;
  let time = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: timeFormat === 12 ? true : false,
  });
  // let time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  document.getElementById("time").innerText = time.substring(0, 5);
});

// Greetings
document.getElementById("greetings").innerText = (function () {
  let currentHour = new Date().getHours();
  console.log(currentHour);
  if (currentHour >= 5 && currentHour < 12) return "Good morning";
  if (currentHour >= 12 && currentHour < 14) return "Good noon";
  if (currentHour >= 14 && currentHour < 18) return "Good afternoon";
  if (currentHour >= 18 && currentHour < 21) return "Good evening";
  if (currentHour >= 21) return "Good night";
  return "Good Morning";
})();

// Background
document.getElementsByClassName("bg")[0].style.backgroundImage = (() => {
  images = [
    'url("/images/wallpapers/desert_tree.jpg")',
    'url("/images/wallpapers/dunes.jpg")',
    'url("/images/wallpapers/fiord.jpg")',
    'url("/images/wallpapers/snow_mountains.jpg")',
    'url("/images/wallpapers/snow.jpg")',
    'url("/images/wallpapers/sunset.jpg")',
  ];
  return images[Math.floor(Math.random() * 6)];
})();

// chrome.browserAction.onClicked.addListener(function(tab) {
//   chrome.tabs.create({'url': chrome.extension.getURL('f.html')}, function(tab) {
//     // Tab opened.
//   });
// });
