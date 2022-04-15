/**
 * I cant use normal timestamp difference to get hours/days/weeks/months cause fucking javascript adds local timezones to it for some reason.
 * like (timeDiffInSeconds / 3600) should yield hours in difference regardless of the timezone cause its the difference? idk.
 * but it takes into account for timezone offset.
 *
 * So i have to get the minute difference and add the timeZoneOffset to it (positive or negative).
 * then do further calculation with the newly gotten minute difference.
 * @param {int} timeStamp
 * @returns object
 */
function eventRemainingTime(timeStamp) {
  let now = Date.now();
  let finalTime = new Date(timeStamp);
  let timeDiffInSeconds = Math.floor((finalTime - now) / 1000);
  let timeDiffInSecondsWithTZOffset = timeDiffInSeconds + new Date().getTimezoneOffset() * 60;
  let remainingTime;
  if (timeDiffInSecondsWithTZOffset < 0) {
    remainingTime = { time: "Finished", notation: "" };
  }
  // if less than an hour
  else if (timeDiffInSecondsWithTZOffset < 3600) {
    remainingTime = {
      time: Math.floor(timeDiffInSecondsWithTZOffset / 60),
      notation: "m",
    };
  }
  // if less than a day
  else if (timeDiffInSecondsWithTZOffset < 86400) {
    remainingTime = {
      time: Math.floor(timeDiffInSecondsWithTZOffset / 3600),
      notation: "h",
    };
  }
  // less than a week
  else if (timeDiffInSecondsWithTZOffset < 604800) {
    remainingTime = {
      time: Math.floor(timeDiffInSecondsWithTZOffset / 86400),
      notation: "d",
    };
  }
  // less than a month
  else if (timeDiffInSecondsWithTZOffset < 2592000) {
    remainingTime = { time: Math.floor(timeDiffInSecondsWithTZOffset / 604800), notation: "w" };
  }
  // less than a year
  else if (timeDiffInSecondsWithTZOffset < 31536000) {
    remainingTime = { time: Math.floor(timeDiffInSecondsWithTZOffset / 2592000), notation: "mo" };
  }
  // greater than a year
  else {
    remainingTime = { time: Math.floor(timeDiffInSeconds / 31536000), notation: "y" };
  }
  return remainingTime;
}
