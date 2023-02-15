<script lang='ts'>
import { weatherData } from "../../stores/weather";
	import DetailedWeatherData from "../DetailedWeatherData/DetailedWeatherData.svelte";

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
            
        <DetailedWeatherData data={$weatherData.current} />

        <footer>
            <button>Save City</button>
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