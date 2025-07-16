<script lang="ts">
	import { getUnits } from '$lib/units';
	import type { Unit } from '../../types/Unit';
	import type { ForecastData } from '../../types/Weather';

	export let data: ForecastData;
	export let open: boolean;
	export let units: Unit;

	let gridIcon: string;
	switch (data.averageWeather) {
		case 'Clouds':
			gridIcon = 'bi-cloud';
			break;
		case 'Clear':
			gridIcon = 'bi-brightness-high';
			break;
		case 'Thunderstorm':
			gridIcon = 'bi-cloud-lightning-rain';
			break;
		case 'Rain':
			gridIcon = 'bi-cloud-rain';
			break;
		case 'Drizzle':
			gridIcon = 'bi-cloud-drizzle';
			break;
		case 'Snow':
			gridIcon = 'bi-cloud-snow';
			break;
		case 'Mist':
			gridIcon = 'bi-cloud-fog';
			break;
		default:
			gridIcon = 'bi-brightness-high';
			break;
	}
</script>

{#if data.hourly.length > 1}
	<details {open}>
		<summary>
			<i class={`bi ${gridIcon}`} />
			&nbsp;
			{data.weekday}
			&nbsp;&nbsp;|&nbsp;&nbsp;
			{data.high}°&nbsp;/&nbsp;{data.low}°
		</summary>

		<figure>
			<table>
				<thead>
					<tr>
						<th scope="col"></th>
						{#each data.hourly as timestamp}
							<th scope="col">{timestamp.time}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row"><i class={`bi ${gridIcon}`} /></th>
						{#each data.hourly as timestamp}
							<td>{timestamp.weather}</td>
						{/each}
					</tr>
					<tr>
						<th scope="row"><i class="bi bi-thermometer" /></th>
						{#each data.hourly as timestamp}
							<td>{timestamp.temp}{getUnits(units, 'temp')}</td>
						{/each}
					</tr>
					<tr>
						<th scope="row"><i class="bi bi-umbrella" /></th>
						{#each data.hourly as timestamp}
							<td>{timestamp.precipitation.toFixed(0)} %</td>
						{/each}
					</tr>
				</tbody>
			</table>
		</figure>
	</details>
{/if}

<style>
	td,
	th {
		white-space: nowrap;
	}
</style>
