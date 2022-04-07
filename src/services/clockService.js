setInterval(function () {
  //get time since midnight in milliseconds
  var now = new Date(),
    then = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0),
    mil = now.getTime() - then.getTime(); // difference in milliseconds

  var h = mil / (1000 * 60 * 60);
  var m = h * 60;
  var s = m * 60;
  // console.log(h + ":" + m + ":" + s);

  var sdegree = s * 6;
  var srotate = "rotate(" + sdegree + "deg)";
  $("#secondsHand").style.transform = srotate;

  var hdegree = h * 30 + h / 2;
  var hrotate = "rotate(" + hdegree + "deg)";
  $("#hoursHand").style.transform = hrotate;

  var mdegree = m * 6;
  var mrotate = "rotate(" + mdegree + "deg)";
  $("#minutesHand").style.transform = mrotate;
}, 1000);

// setInterval(setClock, 1000);
// // setInterval(setSecondsHand, 60 * 1000);

// $("#dataSecondHand").classList.add("animateSecond");
// setInterval(() => {
//   $("#dataSecondHand").classList.toggle("animateSecond");
// }, 60 * 1000);

// function setClock() {
//   const currentDate = new Date();
//   const secondsRatio = currentDate.getSeconds() / 60;
//   const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
//   const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;
//   setRotation($("#dataSecondHand"), secondsRatio);
//   setRotation($("#dataMinuteHand"), minutesRatio);
//   setRotation($("#dataHourHand"), hoursRatio);
// }

// // function setSecondsHand() {
// //   secondHand.style.animation = "spinSecond 60s";
// // }

// function setRotation(element, rotationRatio) {
//   if (element == $("#dataSecondHand")) {
//     console.log(rotationRatio * 360, element.style.transform);
//     // if (rotationRatio == 0) {
//     //   element.classList.add("no-transition");
//     //   // element.classList.remove("no-transition");
//     // } else {
//     //   element.classList.remove("no-transition");
//     // }
//   } else {
//     element.style.setProperty("--rotation", rotationRatio * 360);
//   }
//   // element.style.transform = "rotate(" + rotationRatio * 360 + "deg)";
// }

// setClock();
