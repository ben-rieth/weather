<script lang='ts'>
	import { getUnits } from "$lib/units";
	import type { Unit } from "../../types/Unit";
	import type { CurrentData } from "../../types/Weather";

    export let data : CurrentData;
    export let units: Unit;
</script>

<div class="data-grid">
    <p>Feels Like: {data.feelsLike} {getUnits(units, "temp")}</p>
    <p>Humidity: {data.humidity} %</p>
    <p>Wind Speed: {data.windSpeed} {getUnits(units, "speed")}</p>
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