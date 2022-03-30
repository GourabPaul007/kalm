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
    console.log(`set timeFormat to localStorage: ${value}`);
  }

  getFont() {}

  setFont() {}
}
