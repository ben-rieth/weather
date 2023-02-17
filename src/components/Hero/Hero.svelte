<script lang='ts'>
	import { getUnits } from "$lib/units";
	import CountryEmoji from "../CountryEmoji/CountryEmoji.svelte";
	import type { WeatherData } from "../../types/Weather";

    export let weatherData : WeatherData;

    $: weather = weatherData?.current.weather.toLowerCase();
</script>

<header 
    class={`hero`}
    style:background-image="url('/images/{weather}.jpg')"
>
    <hgroup>
        <h3>
            <span id="city">{weatherData.city.city}{weatherData.city.state && `, ${weatherData.city.state}`}</span>
            <CountryEmoji flag={weatherData.city.countryFlag} size='md' />
        </h3>
        <h4>{weatherData.current.temp} {getUnits(weatherData.units, "temp")}</h4>
        <!-- svelte-ignore a11y-missing-content -->
        <h2></h2>
    </hgroup>
</header>

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