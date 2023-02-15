<script lang='ts'>
	import type { ForecastData } from "../../types/Weather";

    export let data : ForecastData;
</script>

<table>
    <thead>
        {#each data.hourly as timestamp}
            <th scope="col">{timestamp.time}</th>
        {/each}
    </thead>
</table>