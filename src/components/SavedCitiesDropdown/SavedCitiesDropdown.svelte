<script lang='ts'>
    import { weatherData, weatherStatus, savedCities } from '../../stores/weather';
    import { onMount } from 'svelte';
    import axios from 'axios';
	import type { City } from '../../types/Geo';
	import { PUBLIC_URL } from '$env/static/public';
	import CountryEmoji from '../CountryEmoji/CountryEmoji.svelte';

    const coordsEndpoint = `${PUBLIC_URL}/api/weather/coords`

    onMount(async () => {
        const _storageData = localStorage.getItem('saved');

        if (_storageData) {
            $savedCities = JSON.parse(_storageData);
        }
    });

    const getWeather = async (city: City) => {
        $weatherStatus = 'loading';

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
    <summary aria-haspopup="listbox">Saved Cities&nbsp;&nbsp;&nbsp;&nbsp;</summary>
    <ul role="listbox">
        {#each $savedCities as city}
            <li>
                <a href="#top" 
                    on:click={() => getWeather(city)}
                >
                    {city.city}{city.state && `, ${city.state}`}
                </a>
            </li>
        {/each}

        {#if $savedCities.length === 0}
            <li>No saved cities</li>
        {/if}
    </ul>
</details>