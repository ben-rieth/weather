<script lang='ts'>

    export let weather: string | undefined;

    let name : string | undefined;
    let url: string | undefined;
    switch (weather) {
        case 'clear':
            name = 'Vijayasimha BR'
            url = 'https://unsplash.com/@jay_neeruhaaku';
            break;
        case 'thunderstorm':
            name = 'Johannes Plenio';
            url = 'https://unsplash.com/@jplenio';
            break;
        case 'rain':
        case 'drizzle':
            name = 'Valentin Müller';
            url = 'https://unsplash.com/@wackeltin_meem';
            break;
        case 'snow':
            name = 'Chandler Cruttenden'
            url = 'https://unsplash.com/@chanphoto';
            break;
        case 'clouds':
            name = 'Joonas Sild';
            url = 'https://unsplash.com/@joonas1233';
            break;
        case 'mist':
        case 'fog':
            name = 'Dave Hoefler';
            url = 'https://unsplash.com/@davehoefler';
            break;
        case 'haze':
            name = 'Alex Gindin';
            url = 'https://unsplash.com/@alexgindin';
            break;
        case 'tornado':
            name = 'Nikolas Noonan';
            url = 'https://unsplash.com/@nikolasnoonan';
            break;
        case 'smoke':
        case 'ash':
            name = 'Malachi Brooks';
            url = 'https://unsplash.com/@mebrooks01';
            break;
        default:
            name = undefined;
            url = undefined;
            break;
    }
</script>

{#if name && url}
    <small>
        Photographer: 
        <a href={url} 
            target="_blank" 
            rel="noreferrer"
        >
            {name}
        </a>
    </small>
{/if}