<script lang='ts'>
	import { getUnits } from "$lib/units";
    import { weatherData } from "../../stores/weather";
	import CountryEmoji from "../CountryEmoji/CountryEmoji.svelte";
	import DefaultCityButton from "../DefaultCityButton/DefaultCityButton.svelte";
	import DetailedWeatherData from "../DetailedWeatherData/DetailedWeatherData.svelte";
	import Forecast from "../Forecast/Forecast.svelte";
	import PhotoAttribution from "../PhotoAttribution/PhotoAttribution.svelte";
	import SaveCityButton from "../SaveCityButton/SaveCityButton.svelte";
	import UnitSwitcher from "../UnitSwitcher/UnitSwitcher.svelte";

    $: weather = $weatherData?.current.weather.toLowerCase();
</script>

{#if $weatherData}
    <!-- <SetDefaultModal city={$weatherData.city} /> -->

    <article>
        <header 
            class={`hero ${weather}`}
        >
            <hgroup>
                <h1>
                    <span id="city">{$weatherData.city.city}{$weatherData.city.state && `, ${$weatherData.city.state}`}</span>
                    <CountryEmoji flag={$weatherData.city.countryFlag} size='md' />
                </h1>
                <h2>{$weatherData.current.temp} {getUnits($weatherData.units, "temp")}</h2>
                <!-- svelte-ignore a11y-missing-content -->
                <h2></h2>
            </hgroup>
        </header>
            
        <section>  
            <DetailedWeatherData 
                data={$weatherData.current} 
                units={$weatherData.units} 
            />
        </section>

        {#each $weatherData.forecast as day, i}
            <Forecast 
                data={day} 
                open={i === 0} 
                units={$weatherData.units}
            />
        {/each}

        <footer>
            <SaveCityButton 
                city={$weatherData.city}
            />
            <UnitSwitcher 
                units={$weatherData.units} 
                lat={$weatherData.city.lat} 
                lon={$weatherData.city.lon}
            />
            <PhotoAttribution weather={weather} /> 
        </footer>
    </article>
{/if}

<style>
    .flag {
        width: 30px;
    }

    .hero {
        background-size: cover;
        background-position: center;
        position: relative;
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

    .drizzle {
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

    .fog {
        background-image: url('images/mist.jpg')
    }

    .haze {
        /** Alex Gindin https://unsplash.com/@alexgindin */
        background-image: url('images/haze.jpg');
    }

    .tornado {
        /* Nikolas Noonan https://unsplash.com/@nikolasnoonan */
        background-image: url('/images/tornado.jpg');
    }

    .smoke {
        /* Malachi Brooks https://unsplash.com/@mebrooks01 */
        background-image: url('/images/smoke.jpg');
    }

    .ash {
        background-image: url('/images/smoke.jpg');
    }
</style>