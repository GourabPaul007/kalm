// document.getElementById("apps").addEventListener("click", () => {
//   alert("bruh");
// });

function initPage() {
  let sidebarRepository = new SidebarRepository();
  if (sidebarRepository.getShowSidebar() == 1) {
    new ShowOrHide().showSidebar();
    $("#showSidebar").checked = true;
  } else {
    new ShowOrHide().hideSidebar();
    $("#showSidebar").checked = false;
  }

  // set all tab content to display none & tabs to not have bg color in settings
  let tabs = $(".tabs")[0].children;
  for (let i = 0; i < tabs.length; i++) {
    $(`#${tabs[i].id}TabContent`).style.display = "none";
  }
  // set general tab content to show in settings
  $(`#general`).style.backgroundColor = "#434343";
  $(`#generalTabContent`).style.display = "block";

  // set sidebar to left
  let sidebarPosition = sidebarRepository.getSidebarPosition();
  let className = sidebarPosition[0].toUpperCase() + sidebarPosition.substring(1);
  $("#selectSidebarPosition").value = sidebarPosition;
  $(".sidebar")[0].classList.add(`place${className}`);
}
initPage();

function initTimeFormat() {
  window.onload = function () {
    let tf = new SettingsRepository().getTimeFormatFromLocalDatabase();
    if (tf === "12" || tf === "24") {
      globalTimeFormat = tf;
    }
    log(`initialized globalTimeFormat: ${globalTimeFormat}`);
    // set the value in settings modal select button
    document.getElementById("timeFormatSelect").value = globalTimeFormat;
  };
}
initTimeFormat();

// clock
// document.getElementById("time").innerText = getTime();
// Greetings
document.getElementById("greetings").innerText = greetings();

// get the time and show it on each second
setInterval(() => {
  // document.getElementById("time").innerText = getTime();
}, 1000);

document.getElementsByClassName("bg")[0].style.backgroundImage = (() => {
  return images[Math.floor(Math.random() * images.length)];
})();

function getTime() {
  let date = new Date();
  let tf = globalTimeFormat;
  let time = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: tf === "12" ? true : false,
  });
  return time.substring(0, 8);
}

function greetings() {
  let currentHour = new Date().getHours();
  if (currentHour >= 5 && currentHour < 12) return "Good morning";
  if (currentHour >= 12 && currentHour < 14) return "Good noon";
  if (currentHour >= 14 && currentHour < 18) return "Good afternoon";
  if (currentHour >= 18 && currentHour < 21) return "Good evening";
  if (currentHour >= 21) return "Good night";
  return "Good Morning";
}

// Set the links in linksModal on startup
function initLinks() {
  let oldLinks = Array.from(document.getElementById("links").children);
  for (let i = 1; i < oldLinks.length; i++) {
    const element = oldLinks[i];
    document.getElementById("links").removeChild(element);
  }
  // document.getElementById("linksModal").children.forEach((element) => {});
  chrome.storage.sync.get("links", function (result) {
    if (!result.links) return;
    for (let i = 0; i < result.links.length; i++) {
      const element = result.links[i];
      document.getElementById("links").insertAdjacentHTML(
        "beforeend",
        `<div class="linkItem" id='${element.elementId}'>
          <a href='${element.linkLinks[0]}'>
            <img
              class='favicon'
              src='https://icons.duckduckgo.com/ip2/${removeProtocolNameFromLink(element.linkLinks[0])}.ico'
              alt=''
            />
            <span>&nbsp;${element.linkTitle}</span>
          </a>
          <div class='linkMoreOptions' id='linkMoreOptions${element.elementId}'>
            <i class="bi bi-three-dots moreOptionsIcon"></i>
          </div>
        </div>`
        // <i class="bi bi-three-dots"></i>
      );
    }
  });
}
initLinks();
// src='https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${element.linkLinks[0]}&size=16'

// chrome.tabs.getCurrent((tab) => {
//   console.log("currentTab", currentTab);
//   if (tab.id !== currentTab.id) {
//     console.log("bruh");
//     chrome.windows.remove(createdWindow.id, () => {});
//   }
// });

// if ((await chrome.tabs.getCurrent()) != currentTab) {
//   chrome.windows.remove(createdWindow.id, () => {});
// }

// chrome.windows.get(
//   windowId: number,
//   queryOptions?: QueryOptions,
//   callback?: function,
// )
