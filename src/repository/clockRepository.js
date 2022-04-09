class ClockRepository {
  setClockType(value) {
    localStorage.setItem("clockType", value);
  }
  getClockType() {
    let clockType = localStorage.getItem("clockType");
    log("got clock type from localStorage" + clockType);
    return clockType ?? "digital";
  }

  setTimeFormat(value) {
    localStorage.setItem("timeFormat", value);
    globalTimeFormat = value;
    log(`set timeFormat to localStorage: ${value}`);
  }
  getTimeFormat() {
    let timeFormat = localStorage.getItem("timeFormat");
    log(`got timeFormat from localStorage: ${timeFormat}`);
    return timeFormat;
  }
}
