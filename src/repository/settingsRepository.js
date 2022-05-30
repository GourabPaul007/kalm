class SettingsRepository {
  getFont() {
    let fontInLocalStorage = localStorage.getItem("font");
    return fontInLocalStorage;
  }

  setFont(font) {
    JSON.stringify(localStorage.setItem("font", font));
  }
}
