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

function getTime() {
  let date = new Date();
  let time = `${date.getHours()}:${date.getMinutes()}`;
  document.getElementById("time").innerText = time;
}
setInterval(getTime, 1000);

// chrome.browserAction.onClicked.addListener(function(tab) {
//   chrome.tabs.create({'url': chrome.extension.getURL('f.html')}, function(tab) {
//     // Tab opened.
//   });
// });
