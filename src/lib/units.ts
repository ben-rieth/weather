/**
 * Gets the unit based on which unit system you are using
 * @param {"imperial" | "metric"} units the unit system
 * @param {"temp" | "speed"} type the type of unit you want
 * @returns {"°F" | "mph" | "°C" | "m/s"} the proper units for the measurement in the specified system
 */
export const getUnits = (units: "imperial" | "metric", type: "temp" | "speed"): "°F" | "mph" | "°C" | "m/s" => {
    
    if (units === "imperial") {
        if(type === "temp") {
            return "°F";
        } else if(type === "speed") {
            return "mph";
        } 
    } else if (units === 'metric') {
        if(type === "temp") {
            return "°C";
        } else if(type === "speed") {
            return "m/s";
        }
    }

    return "°F"
}