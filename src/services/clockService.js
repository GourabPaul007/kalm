globalTimeFormat = "12";

initTimeFormat();
initClockType(new ClockRepository().getClockType());

function initClockType(clockType) {
  let allClocks = $("#time-div").children;
  console.log(clockType);
  switch (clockType) {
    case "digital":
      for (let i = 0; i < allClocks.length; i++) {
        allClocks[i].style.display = "none";
      }
      $("#digitalClock").style.display = "block";
      digitalClock();
      setInterval(digitalClock, 1000);
      break;

    case "analog":
      for (let i = 0; i < allClocks.length; i++) {
        allClocks[i].style.display = "none";
      }
      $("#analogClock").style.display = "block";
      analogClock();
      setInterval(analogClock, 1000);
      break;

    default:
      break;
  }
}

function analogClock() {
  let now = new Date();
  let then = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  let differenceInMilliseconds = now.getTime() - then.getTime(); //get time since midnight in milliseconds/difference in milliseconds
  let h = differenceInMilliseconds / (1000 * 60 * 60);
  let m = h * 60;
  let s = m * 60;
  // console.log(h + ":" + m + ":" + s);
  let sdegree = s * 6; // 360/60 = 6
  $("#secondsHand").style.transform = `rotate(${sdegree}deg)`;
  let hdegree = h * 30; //  360/12 = 30
  $("#hoursHand").style.transform = `rotate(${hdegree}deg)`;
  let mdegree = m * 6;
  $("#minutesHand").style.transform = `rotate(${mdegree}deg)`;
}

function digitalClock() {
  let date = new Date();
  let tf = globalTimeFormat;
  let time = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: tf === "12" ? true : false,
  });
  $("#digitalClock").innerText = time.substring(0, 8);
}

function initTimeFormat() {
  window.onload = function () {
    let tf = new ClockRepository().getTimeFormat();
    if (tf === "12" || tf === "24") {
      globalTimeFormat = tf;
    }
    log(`initialized globalTimeFormat: ${globalTimeFormat}`);
    // set the value in settings modal select button
    document.getElementById("timeFormatSelect").value = globalTimeFormat;
  };
}

// let clockType = localStorage.getItem("clockType") ?? "digital";
