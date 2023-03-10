import type { Direction } from "../types/Direction";

export const DIRECTION_ICON_MAP = new Map([
    ['n', 'bi-arrow-up'],
    ['ne', 'bi-arrow-up-right'],
    ['e', 'bi-arrow-right'],
    ['se', 'bi-arrow-down-right'],
    ['s', 'bi-arrow-down'],
    ['sw', 'bi-arrow-down-left'],
    ['w', 'bi-arrow-left'],
    ['nw', 'bi-arrow-up-left']
]);

export const windDirectionFromDegree = (windDeg: number) : Direction => {
    let dir : Direction;
    
    if (windDeg > 22.5 && windDeg <= 67.5) dir = 'ne';
    else if (windDeg > 67.5 && windDeg <= 112.5) dir = 'e';
    else if (windDeg > 112.5 && windDeg <= 157.5) dir = 'se';
    else if (windDeg > 157.5 && windDeg <= 202.5) dir = 's';
    else if (windDeg > 202.5 && windDeg <= 247.5) dir = 'sw';
    else if (windDeg > 247.5 && windDeg <= 292.5) dir = 'w';
    else if (windDeg > 292.5 && windDeg <= 337.5) dir = 'nw';
    else dir = 'n';

    return dir;
}