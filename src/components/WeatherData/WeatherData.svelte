<script lang='ts'>
	import { getUnits } from "$lib/units";
    import { weatherData } from "../../stores/weather";
	import CountryEmoji from "../CountryEmoji/CountryEmoji.svelte";
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
            class={`hero`}
            style:background-image="url('/images/{weather}.jpg')"
        >
            <hgroup>
                <h3>
                    <span id="city">{$weatherData.city.city}{$weatherData.city.state && `, ${$weatherData.city.state}`}</span>
                    <CountryEmoji flag={$weatherData.city.countryFlag} size='md' />
                </h3>
                <h4>{$weatherData.current.temp} {getUnits($weatherData.units, "temp")}</h4>
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
</style>