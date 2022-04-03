globalTimeFormat = "12";

class SettingsRepository {
  getTimeFormatFromLocalDatabase() {
    let timeFormat = localStorage.getItem("timeFormat");
    log(`got timeFormat from localStorage: ${timeFormat}`);
    return timeFormat;
  }

  setTimeFormatToLocalDatabase(value) {
    localStorage.setItem("timeFormat", value);
    globalTimeFormat = value;
    log(`set timeFormat to localStorage: ${value}`);
  }

  getFont() {}

  setFont() {}

  setShowSidebar(value) {
    log("showSidebar" + value);
    localStorage.setItem("showSidebar", value);
  }
  getShowSidebar() {
    return localStorage.getItem("showSidebar");
  }
}
