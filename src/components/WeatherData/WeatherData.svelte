<script lang='ts'>
import { weatherData } from "../../stores/weather";
	import DetailedWeatherData from "../DetailedWeatherData/DetailedWeatherData.svelte";
	import Forecast from "../Forecast/Forecast.svelte";
	import SaveCityButton from "../SaveCityButton/SaveCityButton.svelte";

</script>

{#if $weatherData}
    <article>
        <header class="hero">
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

        {#each $weatherData.forecast as day}
            <Forecast data={day}/>
        {/each}

        <footer>
            <SaveCityButton 
                city={{
                    city: $weatherData.city,
                    country: $weatherData.country,
                    lat: $weatherData.lat,
                    lon: $weatherData.lon,
                }}
            />
        </footer>

    </article>
{/if}

<style>
    .hero {
        background-image: url('/images/clear-skies.jpg');
        background-size: cover;
        background-position: center;
    }
</style>