const types = new Set(["warn", "error"]);

let env = ["dev", "prod"][0];

function log(value, type) {
  if (env !== "dev") return;
  let css = "font-size: 14px;";
  switch (type) {
    case undefined:
      css += "color: #4caf50;";
      console.log(`%c ${value}`, css);
      break;
    case "error":
      css += "color: #f44336;";
      console.log(`%c ${value}`, css);
      break;
    default:
      css += "color: #e91e63;";
      console.log(`%c ${value} ----- Ayo What?`, css);
      break;
  }
}
