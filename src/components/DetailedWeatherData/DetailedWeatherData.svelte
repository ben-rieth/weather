<script lang="ts">
	import { capitalizeEachWord } from '$lib/string';
	import { getUnits } from '$lib/units';
	import { DIRECTION_ICON_MAP } from '$lib/wind';
	import type { Unit } from '../../types/Unit';
	import type { CurrentData } from '../../types/Weather';

	export let data: CurrentData;
	export let units: Unit;

	const icon = DIRECTION_ICON_MAP.get(data.windDirection);

	const mql = window.matchMedia('(max-width: 600px)');
	const small = mql.matches;
</script>

<table role="grid">
	<tbody>
		<tr>
			<td colspan="2">
				Right Now:
				<strong>
					{capitalizeEachWord(data.weatherDescription)}
				</strong>
			</td>
		</tr>
		{#if small}
			<tr>
				<td>Feels Like: {data.feelsLike}{getUnits(units, 'temp')}</td>
			</tr>
			<tr>
				<td>Humidity: {data.humidity.toFixed(0)}%</td>
			</tr>
			<tr>
				<td>
					Wind:
					{data.windSpeed}{getUnits(units, 'speed')}
					<i class={`bi ${icon}`} />
				</td>
			</tr>
			<tr><td>Sunrise: {data.sunriseTime}</td></tr>
			<tr><td>Sunset: {data.sunsetTime}</td></tr>
		{:else}
			<tr>
				<td>Feels Like: {data.feelsLike}{getUnits(units, 'temp')}</td>
				<td>Humidity: {data.humidity.toFixed(0)}%</td>
			</tr>
			<tr>
				<td>
					Wind:
					{data.windSpeed}{getUnits(units, 'speed')}
					<i class={`bi ${icon}`} />
				</td>
				<td>Pressure: {data.pressure} hPa</td>
			</tr>
			<tr>
				<td>Sunrise: {data.sunriseTime}</td>
				<td>Sunset: {data.sunsetTime}</td>
			</tr>
		{/if}
	</tbody>
</table>
