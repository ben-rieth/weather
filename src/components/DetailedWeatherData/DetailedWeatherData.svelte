<script lang='ts'>
	import { getUnits } from "$lib/units";
	import type { Unit } from "../../types/Unit";
	import type { CurrentData } from "../../types/Weather";

    export let data : CurrentData;
    export let units: Unit;
</script>

<table role="grid">
    <tr>
        <td>Feels Like: {data.feelsLike}{getUnits(units, "temp")}</td>
        <td>Humidity: {data.humidity}%</td>
    </tr>
    <tr>
        <td>Wind Speed: {data.windSpeed}{getUnits(units, "speed")}</td>
        <td>Pressure: {data.pressure} hPa</td>
    </tr>
    <tr>
        <td>Sunrise: {data.sunriseTime}</td>
        <td>Sunset: {data.sunsetTime}</td>
    </tr>
</table>