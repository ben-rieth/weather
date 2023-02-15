<script lang='ts'>
    import { weatherData } from "../../stores/weather";
	import DetailedWeatherData from "../DetailedWeatherData/DetailedWeatherData.svelte";
	import Forecast from "../Forecast/Forecast.svelte";
	import SaveCityButton from "../SaveCityButton/SaveCityButton.svelte";
	import UnitSwitcher from "../UnitSwitcher/UnitSwitcher.svelte";
</script>

{#if $weatherData}
    <article>
        <header 
            class={`hero ${$weatherData.current.weather.toLowerCase()}`}
        >
            <hgroup>
                <h1>{$weatherData.city}, {$weatherData.country}</h1>
                <h2>{$weatherData.current.temp}</h2>
                <!-- svelte-ignore a11y-missing-content -->
                <h2></h2>
            </hgroup>    
        </header>
            
        <section>
            <DetailedWeatherData data={$weatherData.current} />
        </section>

        {#each $weatherData.forecast as day, i}
            <Forecast data={day} open={i === 0}/>
        {/each}

        <footer>
            <SaveCityButton 
                city={{
                    city: $weatherData.city,
                    country: $weatherData.country,
                    countryCode: $weatherData.countryCode,
                    lat: $weatherData.lat,
                    lon: $weatherData.lon,
                }}
            />
            <UnitSwitcher 
                units={$weatherData.units} 
                lat={$weatherData.lat} 
                lon={$weatherData.lon}
            />
        </footer>

    </article>
{/if}

<style>
    .hero {
        background-size: cover;
        background-position: center;
    }

    .clear {
        background-image: url('/images/clear.jpg');
    }

    .thunderstorm {
        /* Johannes Plenio https://unsplash.com/@jplenio */
        background-image: url('/images/thunderstorm.jpg');
    }

    .rain {
        /* Valentin Müller https://unsplash.com/@wackeltin_meem */
        background-image: url('/images/rain.jpg');
    }

    .snow {
        /* Chandler Cruttenden https://unsplash.com/@chanphoto */
        background-image: url('/images/snow.jpg')
    }

    .clouds {
        /*  Joonas Sild https://unsplash.com/@joonas1233  */
        background-image: url('images/cloudy.jpg')
    }

    .mist {
        /* Dave Hoefler https://unsplash.com/@davehoefler */
        background-image: url('images/mist.jpg')
    }
</style>