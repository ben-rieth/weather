<script lang='ts'>
	import { capitalizeEachWord } from "$lib/string";
	import { getUnits } from "$lib/units";
	import { DIRECTION_ICON_MAP } from "$lib/wind";
	import type { Unit } from "../../types/Unit";
	import type { CurrentData } from "../../types/Weather";

    export let data : CurrentData;
    export let units: Unit;

    const icon = DIRECTION_ICON_MAP.get(data.windDirection);
</script>

<table role="grid">
    <tr>
        <td colspan="2">
            Right Now: 
            <strong>
                {capitalizeEachWord(data.weatherDescription)}
            </strong>
        </td>
    </tr>
    <tr>
        <td>Feels Like: {data.feelsLike}{getUnits(units, "temp")}</td>
        <td>Humidity: {data.humidity.toFixed(0)}%</td>
    </tr>
    <tr>
        <td>
            Wind: 
            {data.windSpeed}{getUnits(units, "speed")}
            <i class={`bi ${icon}`} />
        </td>
        <td>Pressure: {data.pressure} hPa</td>
    </tr>
    <tr>
        <td>Sunrise: {data.sunriseTime}</td>
        <td>Sunset: {data.sunsetTime}</td>
    </tr>
</table>