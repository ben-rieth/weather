export const getPhotographer = (weather: string | undefined) => {

    switch (weather) {
        case 'clear':
            return['Vijayasimha BR', 'https://unsplash.com/@jay_neeruhaaku'];
        case 'thunderstorm':
            return ['Johannes Plenio', 'https://unsplash.com/@jplenio'];
        case 'rain':
        case 'drizzle':
            return ['Valentin Müller', 'https://unsplash.com/@wackeltin_meem'];
        case 'snow':
            return ['Chandler Cruttenden', 'https://unsplash.com/@chanphoto'];
        case 'clouds':
            return ['Joonas Sild', 'https://unsplash.com/@joonas1233'];
        case 'mist':
        case 'fog':
            return ['Dave Hoefler', 'https://unsplash.com/@davehoefler'];
        case 'haze':
            return ['Alex Gindin', 'https://unsplash.com/@alexgindin'];
        case 'tornado':
            return ['Nikolas Noonan', 'https://unsplash.com/@nikolasnoonan'];
        case 'smoke':
        case 'ash':
            return ['Malachi Brooks', 'https://unsplash.com/@mebrooks01'];
        default:
            return [undefined, undefined];
    }
}