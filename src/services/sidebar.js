let createdWindow;

$(".sidebarLinks").onclick = (e) => {
  console.log(e);
};

function removePreviousWindow() {
  if (createdWindow) {
    chrome.windows.get(createdWindow.id, (window) => {
      if (window.id) {
        chrome.windows.remove(window.id);
      }
    });
  }
}

function createData(url) {
  return {
    type: "panel",
    focused: true,
    top: window.outerHeight - window.innerHeight,
    left: 56,
    width: 1000,
    height: window.innerHeight - 56,
    url: url,
  };
}

$("#openYoutube").onclick = async (e) => {
  e.preventDefault();
  removePreviousWindow();
  currentTab = await chrome.tabs.getCurrent();
  createdWindow = await chrome.windows.create(createData("https://youtube.com"));
  // createdWindow.pinned = true;
};

$("#openWhatsapp").onclick = async (e) => {
  e.preventDefault();
  removePreviousWindow();
  currentTab = await chrome.tabs.getCurrent();
  createdWindow = await chrome.windows.create(createData("https://web.whatsapp.com"));
};

$("#openDiscord").onclick = async (e) => {
  e.preventDefault();
  removePreviousWindow();
  currentTab = await chrome.tabs.getCurrent();
  createdWindow = await chrome.windows.create(createData("https://discord.com/app"));
};
