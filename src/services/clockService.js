setInterval(setClock, 1000);
// setInterval(setSecondsHand, 60 * 1000);

function setClock() {
  const currentDate = new Date();
  const secondsRatio = currentDate.getSeconds() / 60;
  const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
  const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;
  setRotation($("#dataSecondHand"), secondsRatio);
  setRotation($("#dataMinuteHand"), minutesRatio);
  setRotation($("#dataHourHand"), hoursRatio);
}

// function setSecondsHand() {
//   secondHand.style.animation = "spinSecond 60s";
// }

function setRotation(element, rotationRatio) {
  if (element == $("#dataSecondHand")) {
    console.log(rotationRatio * 360, element.style.transform);
  }
  if (rotationRatio * 360 == 0) {
    element.classList.add("no-transition");
  } else {
    element.classList.remove("no-transition");
  }
  element.style.setProperty("--rotation", rotationRatio * 180);
}

setClock();
