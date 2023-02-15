<script lang='ts'>
import { weatherData } from "../../stores/weather";

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

        <details open>
            <summary>Detailed Current Weather</summary>
                <div class="data-grid">
                    <p>Feels Like: {$weatherData.current.feelsLike}</p>
                    <p>Humidity: {$weatherData.current.humidity}</p>
                    <p>Wind Speed: {$weatherData.current.windSpeed}</p>
                    <p>Pressure: {$weatherData.current.pressure}</p>
                    <p>Sunrise: {$weatherData.current.sunriseTime}</p>
                    <p>Sunset: {$weatherData.current.sunsetTime}</p>
                </div>
        </details>      

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

    .data-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        max-width: 800px;
    }
</style>