import axios from "axios";

/**
 * 
 * @param {string} country - The name of the country
 * @returns {string} The CCA2 code for the country
 * 
 * @throws {Error} if the country cannot be found
 */
const getCountryCode = async (country: string) => {
    const countryJson = await Promise.any([
        axios.get(`https://restcountries.com/v3.1/name/${country}`),
        axios.get(`https://restcountries.com/v3.1/alpha/${country}`)
    ]).then(res => res.data);

    try {
        // if country is ambiguous, then multiple countries may be returned
        if (countryJson.length <= 1) {
            return countryJson[0]['cca2'];
        }

        for (const returnedCountry of countryJson) {
            if (country.toLowerCase() === returnedCountry.name.common.toLowerCase() ||
                country.toLowerCase() === returnedCountry.name.official.toLowerCase()) {
                    return returnedCountry.cca2;
                }
        }
    } catch (err) {
        throw new Error("Country not found");
    }
};

/**
 * Returns the unit system used in the specified country
 * 
 * @param {string} country - CCA2 code for the country
 * @returns {"imperial" | "metric"} The unit system of the country
 */
const getUnitsBasedOnCountry = (country: string) => {
    const imperialCountries = ["LR", "US", "MW"];

    if (imperialCountries.includes(country)) {
        return 'imperial';
    }

    return 'metric';
}

export {
    getCountryCode,
    getUnitsBasedOnCountry
}