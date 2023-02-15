<script lang='ts'>
	import type { ForecastData } from "../../types/Weather";

    export let data : ForecastData;
</script>

<details>
    <summary>{data.weekday}</summary>
    <figure>
        <table>
            <thead>
                {#each data.hourly as timestamp}
                    <th scope="col">{timestamp.time}</th>
                {/each}
            </thead>
            <tbody>
                <tr>
                    {#each data.hourly as timestamp}
                        <td>{timestamp.weather}</td>
                    {/each}
                </tr>
                <tr>
                    {#each data.hourly as timestamp}
                        <td>{timestamp.temp}</td>
                    {/each}
                </tr>
            </tbody>
        </table>
    </figure>
</details>