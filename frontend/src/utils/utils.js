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

export function getClosingStatus(facility, currDateTime, threshold) {
  var thresh = threshold || CLOSING_THRESH
  var day = currDateTime.getDay()

  const cmpCurr = createDefaultDateTime(currDateTime, ""); 
  
  const openingDateTime = facility.hours[day].open;
  const closingDateTime = facility.hours[day].close;
  console.log(openingDateTime) 
  
  const cmpOpen = createDefaultDateTime(null, openingDateTime) 
  const cmpClose = createDefaultDateTime(null, closingDateTime)

  var cmpOpenThresh = new Date(cmpOpen);
  cmpOpenThresh.setMinutes(cmpOpen.getMinutes() - thresh)
  if (cmpCurr >= cmpClose || cmpCurr < cmpOpenThresh) {
    return "Closed";
  }
  if (cmpCurr < cmpOpen) {
    return "Opening Soon";
  }

  var cmpCloseThresh = new Date(cmpClose);
  cmpCloseThresh.setMinutes(cmpClose.getMinutes() - thresh)
  if (cmpCurr >= cmpCloseThresh) {
    return "Closing Soon";
  }
  return "Open";
}
