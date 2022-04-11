class SidebarRepository {
  setShowSidebar(value) {
    log("showSidebar" + value);
    localStorage.setItem("showSidebar", value);
  }
  getShowSidebar() {
    let sidebarStatus = localStorage.getItem("showSidebar");
    log(`got show sidebar status from localstorage: ${sidebarStatus}`);
    return JSON.parse(sidebarStatus);
  }

  setSidebarPosition(value) {
    localStorage.setItem("sidebarPosition", value);
    log("sidebar position set to: " + value);
  }
  getSidebarPosition() {
    log("sidebarPosition in local storage: " + localStorage.getItem("sidebarPosition"));
    return localStorage.getItem("sidebarPosition") ?? "left";
  }
}
