<script lang='ts'>
	import { weatherData } from "../../stores/weather";
	import DetailedWeatherData from "../DetailedWeatherData/DetailedWeatherData.svelte";
	import Forecast from "../Forecast/Forecast.svelte";
	import Hero from "../Hero/Hero.svelte";
	import PhotoAttribution from "../PhotoAttribution/PhotoAttribution.svelte";
	import SaveCityButton from "../SaveCityButton/SaveCityButton.svelte";
	import UnitSwitcher from "../UnitSwitcher/UnitSwitcher.svelte";

    $: weather = $weatherData?.current.weather.toLowerCase();
</script>

{#if $weatherData}
    <article>
        <Hero weatherData={$weatherData} /> 
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