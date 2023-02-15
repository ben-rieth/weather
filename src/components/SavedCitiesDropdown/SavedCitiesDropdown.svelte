<script lang='ts'>
    import { weatherData, weatherStatus, savedCities } from '../../stores/weather';
    import { onMount } from 'svelte';
    import axios from 'axios';
	import type { SavedCity } from '../../types/Geo';
	import { PUBLIC_URL } from '$env/static/public';

    const coordsEndpoint = `${PUBLIC_URL}/api/weather/coords`

    onMount(async () => {
        const _storageData = localStorage.getItem('saved');

        if (_storageData) {
            $savedCities = JSON.parse(_storageData);
        }
    });

    const getWeather = async (city: SavedCity) => {
        try {
            const data = await axios.get(coordsEndpoint, {
                params: {
                    lat: city.lat,
                    lon: city.lon,
                }
            }).then(res => res.data);

            $weatherData = data;

            $weatherStatus = 'success';
        } catch (err) {
            $weatherStatus = 'error';
        }
    };
</script>

<details role="list">
    <summary aria-haspopup="listbox">Saved Cities&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</summary>
    <ul role="listbox">
        {#each $savedCities as city}
            <li>
                <a href="#top" 
                    on:click={() => getWeather(city)}
                >
                    {city.city}
                </a>
            </li>
        {/each}

        {#if $savedCities.length === 0}
            <li>No saved cities</li>
        {/if}
    </ul>
</details>