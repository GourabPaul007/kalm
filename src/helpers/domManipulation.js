function $(value) {
  switch (value[0]) {
    case "#":
      return document.getElementById(value.substring(1));
    case ".":
      return document.getElementsByClassName(value.substring(1))[0];
    default:
      return "bruh";
  }
}
