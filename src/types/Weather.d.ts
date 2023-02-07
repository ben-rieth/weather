type CurrentWeatherApiResult = {
    coord: {
        lon: number;
        lat: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
    };
    clouds: {
        all: number;
    };
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    rain: {
        "3h": number;
    };
    visibility: number;
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    },
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

type ForecastAPIResult = {
    cod: string;
    message: string;
    cnt: string;
    list: {
        dt: number;
        main: {
            temp: number;
            feels_like: number;
            temp_min: number;
            temp_max: number;
            pressure: number;
            sea_level: number;
            grnd_level: number;
            humidity: number;
            temp_kf: number;
        },
        weather: {
            id: number;
            main: string;
            description: string;
            icon: string;
        }[],
        clouds: {
            all: number;
        },
        wind: {
            speed: number;
            deg: number;
            gust: number;
        },
        visibility: number;
        pop: number;
        rain: {
            "3h": number;
        },
        sys: {
            pod: string;
        },
        dt_txt: string;
    }[];
    city: {
        id: number;
        name: string;
        coord: {
            lat: number;
            lon: number;
        }
        country: string;
        population: number;
        timezone: number;
        sunrise: number;
        sunset: number;
    }
}

type ForecastData = {
    date: string;
    weekday: string;
    hourly: {
        time: string;
        timeUnix: number;
        temp: string;
        weather: string;
        weatherDescription: string;
        precipitation: number;
    }[];
}[];

type CurrentData = {
    temp: string;
    feelsLike: string;
    weather: string;
    weatherDescription: string;
    humidity: number;
    windSpeed: number;
    sunriseTime: string;
    sunsetTime: string;
    sunriseUnix: number;
    sunsetUnix: number;
    pressure: number
};

type DateAndTime = {
    date: string;
    time: string;
}

type WeatherData = DateAndTime & {
    current: CurrentData;
    forecast: ForecastData;
}

export { 
    ForecastAPIResult,
    ForecastData, 
    CurrentWeatherApiResult, 
    CurrentData, 
    DateAndTime,
    WeatherData 
};