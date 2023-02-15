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
            <div class="hero">
                <hgroup>
                    <h2>{$weatherData.current.temp}</h2>
                    <h3>{$weatherData.current.weather}</h3>
                </hgroup>       
                <div class="data-grid">
                    <p>feels like</p>
                    <p>humidity</p>
                    <p>wind speed</p>
                    <p>pressure</p>
                    <p>sunrise</p>
                    <p>sunset</p>
                </div>
            </div>
        </details>      

        <footer>
            <button>Save City</button>
        </footer>

    </article>
{/if}

<style>
    .hero {
        padding: 30px 20px;
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