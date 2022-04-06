class SidebarRepository {
  setShowSidebar(value) {
    log("showSidebar" + value);
    localStorage.setItem("showSidebar", value);
  }
  getShowSidebar() {
    return localStorage.getItem("showSidebar");
  }

  setSidebarPosition(value) {
    localStorage.setItem("sidebarPosition", value);
    log("sidebar position set to: " + value);
  }
  getSidebarPosition() {
    log(localStorage.getItem("sidebarPosition"));
    return localStorage.getItem("sidebarPosition") ?? "left";
  }
}
