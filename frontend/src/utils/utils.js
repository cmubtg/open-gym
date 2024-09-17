import { MEDIUM_THRESH, HIGH_THRESH, CLOSING_THRESH } from './constants';


// Gets corresponding css occupancy class 
// based on occupancy percentage
export function getOccClass(occPercent) {
    switch (true) {
        case occPercent < MEDIUM_THRESH:
          return 'low';
        case occPercent < HIGH_THRESH:
          return 'medium';
        default:
          return 'high';
    }
}

export function isOpen(status) {
    return (status.toLowerCase() === "open");
}
export function isClosed(status){
    return (status.toLowerCase() === "closed" || status.toLowerCase() === "opening soon");
}

function createDefaultDateTime(dateTime, time){
  let res = new Date(0);
  if (dateTime != null){
    res.setHours(dateTime.getHours());
    res.setMinutes(dateTime.getMinutes());
    return res;
  }
  let timeArr = time.split(":");
  res.setHours(timeArr[0]);
  res.setMinutes(timeArr[1]);
  return res;
}

// Compares two times
// Returns difference between two times in minutes
  // 0 if equal
  // positive if time1 > time2
  // negative if time1 < time2
function cmpTime(time1, time2) {
  const minutesInHour = 60;

  const getMinutes = date => date.getHours() * minutesInHour + date.getMinutes();

  const minutes1 = getMinutes(time1);
  const minutes2 = getMinutes(time2);

  return minutes1 - minutes2;
}

function getDayOfWeekName(day) {
  if (day < 0 || day > 6)
    return "";
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[day];
}

function formatTime(time) {
  const hours = time.getHours();
  const minutes = time.getMinutes();

  const formattedHours = (hours < 10 ? '0' : '') + hours;
  const formattedMinutes = (minutes < 10 ? '0' : '') + minutes;
  return `${formattedHours}:${formattedMinutes}`;
}
function formatTime12h(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  
  // Calculate 12-hour time and determine if it's AM or PM
  const amPm = hours >= 12 ? 'pm' : 'am';
  const formattedHours = (hours % 12 === 0 ? 12 : hours % 12);
  const formattedMinutes = (minutes < 10 ? '0' : '') + minutes;

  return `${formattedHours}:${formattedMinutes} ${amPm}`;
}


export function getNextOpenReadable(facility, currTime) {
  var day = currTime.getDay()

  const openTime = facility.hours.data[day].open;
  const closeTime = facility.hours.data[day].close;

  if (cmpTime(currTime, closeTime) >= 0){
    const nextDayTime = facility.hours.data[(day + 1) % 7].open;
    return `${getDayOfWeekName((day + 1) % 7)}, ${formatTime12h(nextDayTime)}`;
  }
  return `${getDayOfWeekName(day)}, ${formatTime12h(openTime)}`;
}

export function getClosingStatus(facility, currTime, threshold) {
  var thresh = threshold || CLOSING_THRESH
  var day = currTime.getDay()

  const openTime = facility.hours.data[day].open;
  const closeTime = facility.hours.data[day].close;

  if (cmpTime(currTime, closeTime) >= 0 || 
      cmpTime(currTime, openTime) < -thresh) {
    return "Closed";
  }
  if (cmpTime(currTime, openTime) <= 0) {
    return "Opening Soon";
  }

  if (cmpTime(currTime, closeTime) >= -thresh) {
    return "Closing Soon";
  }
  return "Open";
}
