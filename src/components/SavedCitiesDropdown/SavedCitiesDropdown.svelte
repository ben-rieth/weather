<script lang='ts'>
    import { weatherData, weatherStatus, savedCities, defaultCity } from '../../stores/weather';
    import { onMount } from 'svelte';
    import axios from 'axios';
	import type { City } from '../../types/Geo';
	import { PUBLIC_URL } from '$env/static/public';
	import CountryEmoji from '../CountryEmoji/CountryEmoji.svelte';

    const coordsEndpoint = `${PUBLIC_URL}/api/weather/coords`

    onMount(async () => {
        const _storageData = localStorage.getItem('saved');

        if (!_storageData) {
            return;
        }

        const saved: City[] = JSON.parse(_storageData);
        $savedCities = saved;

        const _default = localStorage.getItem('default');
        if(!_default) {
            await getWeather(saved[0]);
            return;
        }

        const defaultCity : City = JSON.parse(_default);
        await getWeather(defaultCity);
        
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

    const isDefault = (city: City) => {
        if (!$defaultCity) return false;

        return `${$defaultCity.city}${$defaultCity.state}${$defaultCity.countryName}` === `${city.city}${city.state}${city.countryName}`;
    }
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
                    <CountryEmoji flag={city.countryFlag} size='sm' />

                    {#if isDefault(city)} 
                        <i class="bi bi-star-fill favorite" />
                    {/if}
                </a>
            </li>
        {/each}

        {#if $savedCities.length === 0}
            <li>No saved cities</li>
        {/if}
    </ul>
</details>

<style>
    .favorite {
        color: #ffc107;
        float: right;
    }
</style>