<script lang='ts'>
	import type { CurrentData } from "../../types/Weather";

    export let data : CurrentData;
</script>

<div class="data-grid">
    <p>Feels Like: {data.feelsLike}</p>
    <p>Humidity: {data.humidity}</p>
    <p>Wind Speed: {data.windSpeed}</p>
    <p>Pressure: {data.pressure}</p>
    <p>Sunrise: {data.sunriseTime}</p>
    <p>Sunset: {data.sunsetTime}</p>
</div> 

<style>
    .data-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        max-width: 800px;
    }
</style>