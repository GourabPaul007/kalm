// localStorage.setItem("clockType", "digital");
// localStorage.setItem("timeFormat", 12);
// localStorage.setItem("showSidebar", true);
// localStorage.setItem("sidebarPosition", "left");

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

  // set greetings on new tab
  $("#greetings").innerText = greetings();

  // set quotes on new tab
  $("#quote-text").innerText = await getQuote();
}
initPage();

function greetings() {
  let currentHour = new Date().getHours();
  if (currentHour >= 5 && currentHour < 12) return "Good morning";
  if (currentHour >= 12 && currentHour < 18) return "Good afternoon";
  if (currentHour >= 14 && currentHour < 18) return "Good afternoon";
  if (currentHour >= 18 && currentHour < 21) return "Good evening";
  if (currentHour >= 21) return "Good night";
  return "Good Morning";
}

async function getQuote() {
  let quoteText = "";
  const response = await fetch("https://api.quotable.io/random?maxLength=50");
  let data = await response.json();
  console.log(data);
  quoteText = `"${data.content}" - ${data.author}`;
  return quoteText;
  // return `"pee pee poo poo" - cum`;
}
