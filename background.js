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

function setTime() {
  let date = new Date();
  let timeFormat = 24;
  let time = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: timeFormat === 12 ? true : false,
  });
  document.getElementById("time").innerText = time.substring(0, 5);
}
setTime();

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
  setTime();
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
  return images[Math.floor(Math.random() * images.length)];
})();

// chrome.browserAction.onClicked.addListener(function(tab) {
//   chrome.tabs.create({'url': chrome.extension.getURL('f.html')}, function(tab) {
//     // Tab opened.
//   });
// });

/**
 * Inside background.js
 *
 * Set the links in sidebar on startup
 */
function initLinks() {
  // let link = document.createElement("a");
  // let image = document.creimageteElement("img");
  // link.setAttribute("href","youtube.com");
  console.log(document.getElementById("linksModal").children);
  let oldLinks = Array.from(document.getElementById("linksModal").children);
  for (let i = 1; i < oldLinks.length; i++) {
    const element = oldLinks[i];
    document.getElementById("linksModal").removeChild(element);
  }
  // document.getElementById("linksModal").children.forEach((element) => {});

  chrome.storage.local.get("links", function (result) {
    for (let i = 0; i < result.links.length; i++) {
      const element = result.links[i];
      document.getElementById("linksModal").insertAdjacentHTML(
        "beforeend",
        `<div class="linkItem" id='${element.elementId}'>
          <a href='${element.linkLinks[0]}'>
            <img
              class='favicon'
              src='https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${element.linkLinks}&size=16'
              alt=''
            />
            <span>&nbsp;${element.linkTitle}</span>
          </a>
          <div class='linkMoreOptions' id='linkMoreOptions${element.elementId}'>
            <i class="bi bi-trash moreOptionsIcon"></i>
          </div>
        </div>`
        // <i class="bi bi-three-dots"></i>
      );
    }
  });
}
initLinks();

// chrome.storage.local.clear();
