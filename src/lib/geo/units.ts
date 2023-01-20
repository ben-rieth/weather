
export const getUnits = (units: "imperial" | "metric", type: "temp" | "speed") => {
    
    if (units === "imperial") {
        if(type === "temp") {
            return "°F";
        } else if(type === "speed") {
            return "mph";
        } 
    } else {
        if(type === "temp") {
            return "°C";
        } else if(type === "speed") {
            return "m/s";
        }
    }
}