<script lang='ts'>
import { weatherData } from "../../stores/weather";

</script>

{#if $weatherData}
    <article>
        <header>
            <h2>{$weatherData.city}, {$weatherData.country}</h2>
        </header>

        <details open>
            <summary>Weather Right Now</summary>
            <hgroup>
                <h3>{$weatherData.current.weather}</h3>
                <h4>{$weatherData.current.weatherDescription}</h4>
            </hgroup>
        </details>
        

        <footer>
            <button>Save City</button>
        </footer>

    </article>
{/if}