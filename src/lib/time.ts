
export const getTimeFromDate = (date: Date, timezone: string) => {

    const time = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: timezone,
    });

    if (time.at(0) === "0") return time.slice(1);

    return time;
}

export const unixToTime = (unixTime: number, timezone: string) => {
    const date = new Date(unixTime * 1000);

    return getTimeFromDate(date, timezone);
}