$("#addWidget").onclick = function () {
  let addWidgetModal = $("#addWidgetModal");
  if (addWidgetModal.style.display === "flex") {
    addWidgetModal.style.display = "none";
  } else {
    addWidgetModal.style.display = "flex";
    $("#updateEventModal").style.display = "none"; // hide the updateEventModal if active
  }
};

// Show the addEventModal on addEvent Button Click in the main modal
$("#addEvent").onclick = (e) => {
  $("#addEventModal").style.display = "flex";
  $("#addWidgetModalContent").style.display = "none";
};

// close the addEventModal on clicking (X Close)
$("#closeAddEventModal").onclick = function (e) {
  $("#addEventModal").style.display = "none";
  $("#addWidgetModalContent").style.display = "flex";
};

// show the event on new tab
function loadEvents(e) {
  // remove old events from DOM
  let oldEvents = Array.from($("#top-right").children);
  for (let i = 1; i < oldEvents.length; i++) {
    $("#top-right").removeChild(oldEvents[i]);
  }

  let events = JSON.parse(localStorage.getItem("events")) ?? [];
  if (events.length > 0) {
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      $("#top-right").insertAdjacentHTML(
        "beforeend",
        `
          <div class="topRightWidget" id="${event.eventId}">
            <span style="font-size: 24px"></span>
            <span style="font-size: 20px"></span>
            <div style="font-size: 16px">${event.eventName}</div>
          </div>
        `
      );
    }
  }
  setEventTimer(events);
}
loadEvents();

function setEventTimer(events) {
  events.forEach((event) => {
    $(`#${event.eventId}`).children[0].innerText = eventRemainingTime(event.eventTime).time;
    $(`#${event.eventId}`).children[1].innerText = eventRemainingTime(event.eventTime).notation;
    setInterval(() => {
      $(`#${event.eventId}`).children[0].innerText = eventRemainingTime(event.eventTime).time;
      $(`#${event.eventId}`).children[1].innerText = eventRemainingTime(event.eventTime).notation;
    }, 10000);
  });
}

// Save the event on save button click
$("#saveEventButton").onclick = (e) => {
  e.preventDefault();
  let timeStamp = $("#eventDateTimeInput").valueAsNumber;
  let eventName = $("#eventNameInput").value;
  let events = JSON.parse(localStorage.getItem("events")) ?? [];
  if (eventName === "") {
    alert("Please add Event name");
    return;
  }
  if (!timeStamp) {
    alert("Please add Event due date & time");
    return;
  }
  events.push({
    eventId: `event${Date.now()}`,
    eventName: eventName,
    eventTime: timeStamp,
  });
  localStorage.setItem("events", JSON.stringify(events));
  // close the modal after done
  $("#updateEventModal").style.display = "none";
  loadEvents();
  $("#eventDateTimeInput").valueAsNumber = NaN;
  $("#eventNameInput").value = "";
};

// show the update widget modal on click
$("#top-right").onclick = (e) => {
  let clickedDOMElement = e.target.parentElement;
  if (clickedDOMElement.className == "topRightWidget") {
    let events = JSON.parse(localStorage.getItem("events"));
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      if (clickedDOMElement.id === event.eventId) {
        $("#addWidgetModal").style.display = "none"; // hide the add widget modal if active
        $("#updateEventModal").style.display = "flex";
        $("#updateEventModal").style.right = `${Math.round(
          window.innerWidth - clickedDOMElement.getBoundingClientRect().right
        )}px`;

        // set the old values in textboxes
        $("#updateEventNameInput").value = event.eventName;
        $("#updateEventDateTimeInput").valueAsNumber = event.eventTime;

        // to update a event
        $("#updateEventButton").onclick = (e) => {
          let newEventName = $("#updateEventNameInput").value;
          let newEventTime = $("#updateEventDateTimeInput").valueAsNumber;
          event.eventName = newEventName;
          event.eventTime = newEventTime;
          localStorage.setItem("events", JSON.stringify(events));
          // close the modal after done
          $("#updateEventModal").style.display = "none";
          loadEvents();
        };

        // to delete a event
        $("#deleteEventButton").onclick = (e) => {
          events.splice(events.indexOf(event), 1);
          localStorage.setItem("events", JSON.stringify(events));
          // close the modal after done
          $("#updateEventModal").style.display = "none";
          loadEvents();
        };
        break;
      }
    }
  }
};

// Close the update event modal on clicking close
$("#closeUpdateEventModal").onclick = (e) => {
  $("#updateEventModal").style.display = "none";
};

// ===================================================================================
// Checks the event Inputs & if the inputs are empty, disables the button & vice-versa
// $("#eventNameInput").addEventListener("input", (e) => {
//   console.log(e);
//   // If the textInput is empty
//   if (e.target.value === "") {
//     console.log("disabled");
//     $("#saveEventButton").disabled = true;
//     $("#saveEventButton").style.backgroundColor = "rgb(31, 31, 31)";
//   }
//   // If the textInput is not empty
//   else {
//     console.log("not disabled");
//     $("#saveEventButton").disabled = false;
//     $("#saveEventButton").style.backgroundColor = "rgb(30, 130, 30)";
//     $("#saveEventButton").onmouseenter = () => {
//       $("#saveEventButton").style.cursor = "pointer";
//       $("#saveEventButton").style.backgroundColor = "rgb(21, 85, 21)";
//     };
//     $("#saveEventButton").onmouseleave = () => {
//       $("#saveEventButton").style.cursor = "default";
//       $("#saveEventButton").style.backgroundColor = "rgb(30, 130, 30)";
//     };
//   }
// });

// $("#eventDateTimeInput").addEventListener("change", (e) => {
//   console.log(e);
//   if (condition) {
//     $("#eventDateTimeInput").value;
//   }
// });
