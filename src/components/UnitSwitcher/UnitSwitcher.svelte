<script lang='ts'>
	import { PUBLIC_URL } from "$env/static/public";
	import axios from "axios";
	import { weatherData, weatherStatus } from "../../stores/weather";
	import type { Unit } from "../../types/Unit";

    export let units: Unit;
    export let lat: number;
    export let lon: number;

    const coordsEndpoint = `${PUBLIC_URL}/api/weather/coords`

    let selected = units;

    const getWeatherWithNewUnit = async () => {
        if (selected === units) return;
        
        $weatherStatus = 'loading';

        try {
            const _data = await axios.get(
                coordsEndpoint,
                {
                    params: {
                        lat,
                        lon,
                        units: selected
                    }
                }
            ).then(res => res.data);

            $weatherData = _data;
            $weatherStatus = 'success';
        } catch {
            $weatherStatus = 'error'
        }
    }
</script>

<select 
    name="units" 
    id="units" 
    bind:value={selected}
    on:change={getWeatherWithNewUnit}
>
    <option 
        value="imperial"
    >
        Imperial
    </option>
    <option 
        value="metric"
    >
        Metric
    </option>
</select>
