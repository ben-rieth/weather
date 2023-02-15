<script lang='ts'>
	import { getUnits } from "$lib/units";
	import type { Unit } from "../../types/Unit";
	import type { ForecastData } from "../../types/Weather";

    export let data : ForecastData;
    export let open : boolean;
    export let units: Unit;
</script>

{#if data.hourly.length > 2}
    <details open={open}>
        <summary>{data.weekday}</summary>
        <figure>
            <table>
                <thead>
                    <th scope="col"></th>
                    {#each data.hourly as timestamp}
                        <th scope="col">{timestamp.time}</th>
                    {/each}
                </thead>
                <tbody>
                    <tr>
                        <th scope="row"><i class="bi bi-cloud" /></th>
                        {#each data.hourly as timestamp}
                            <td>{timestamp.weather}</td>
                        {/each}
                    </tr>
                    <tr>
                        <th scope="row"><i class="bi bi-thermometer" /></th>
                        {#each data.hourly as timestamp}
                            <td>{timestamp.temp} {getUnits(units, "temp")}</td>
                        {/each}
                    </tr>
                    <tr>
                        <th scope="row"><i class="bi bi-umbrella" /></th>
                        {#each data.hourly as timestamp}
                            <td>{timestamp.precipitation} %</td>
                        {/each}
                    </tr>
                </tbody>
            </table>
        </figure>
    </details>
{/if}