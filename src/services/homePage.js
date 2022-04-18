localStorage.setItem("clockType", "digital");
localStorage.setItem("timeFormat", 12);
localStorage.setItem("showSidebar", true);
localStorage.setItem("sidebarPosition", "left");

async function initPage() {
  // set background image on start
  document.getElementsByClassName("bg")[0].style.backgroundImage = (() => {
    return images[Math.floor(Math.random() * images.length)];
  })();

  // set clock type on settings
  $("#selectClockType").value = new ClockRepository().getClockType();

  // show or hide sidebar on start
  let sidebarRepository = new SidebarRepository();
  if (sidebarRepository.getShowSidebar() === true) {
    console.log("huh");
    $("#sidebar").style.display = "flex";
    $("#showSidebar").checked = true;
  } else {
    $("#sidebar").style.display = "none";
    $("#showSidebar").checked = false;
  }

  // Set Sidebar color based on background image
  let image = new Image();
  let imageSrc = await $(".bg")[0].style.backgroundImage;
  let imageUrl = await imageSrc.substring(5, imageSrc.length - 2);
  image.src = await imageUrl;
  let values;
  image.onload = () => {
    values = getAverageRGB(image);
    $("#sidebar").style.backgroundColor = `rgba(${values.r}, ${values.g}, ${values.b}, 0.8)`;
  };

  // set all tab content to display none & tabs to not have bg color in settings
  let tabs = $(".tabs")[0].children;
  for (let i = 0; i < tabs.length; i++) {
    $(`#${tabs[i].id}TabContent`).style.display = "none";
  }
  // set general tab content to show in settings
  $(`#generalSettings`).style.backgroundColor = "#434343";
  $(`#generalSettingsTabContent`).style.display = "block";

  // set sidebar to position
  let sidebarPosition = sidebarRepository.getSidebarPosition();
  let className = sidebarPosition[0].toUpperCase() + sidebarPosition.substring(1);
  $("#selectSidebarPosition").value = sidebarPosition;
  $("#sidebar").classList.add(`place${className}`);
}
initPage();

document.getElementById("greetings").innerText = greetings();

function greetings() {
  let currentHour = new Date().getHours();
  if (currentHour >= 5 && currentHour < 12) return "Good morning";
  if (currentHour >= 12 && currentHour < 18) return "Good afternoon";
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
              src='${faviconLink(element.linkLinks[0])}'
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
