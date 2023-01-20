import axios from "axios";

/**
 * 
 * @param {string} country - The name of the country
 * @returns {string | undefined} The CCA2 code for the country or undefined if country not found
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
        return undefined;
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

/**
 * Get the name of a country from the country code
 * 
 * @param countryCode the CCA2 code of a country
 * @returns {string} the common name of the country
 */
const getCountryName = async (countryCode: string) => {
    const data = await axios.get(
        `https://restcountries.com/v3.1/alpha/${countryCode}`,
    ).then(res => res.data);

    return data[0]['name']['common'];
}

export {
    getCountryCode,
    getUnitsBasedOnCountry,
    getCountryName
}