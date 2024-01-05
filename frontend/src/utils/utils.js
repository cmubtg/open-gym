import { MEDIUM_THRESH, HIGH_THRESH } from './constants';

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


export function isClosed(facility, time) {
    return Math.round(Math.random())
}
