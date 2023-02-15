<script lang='ts'>
    import { savedCities } from '../../stores/weather';
    import { onMount } from 'svelte';
	import type { SavedCity } from '../../types/Geo';

    onMount(async () => {
        const _storageData = localStorage.getItem('saved');

        if (_storageData) {
            $savedCities = JSON.parse(_storageData);
        }
    });
</script>

<details role="list">
    <summary aria-haspopup="listbox">Saved Cities</summary>
    <ul role="listbox">
        {#each $savedCities as city}
            <li>{city.city}, {city.country}</li>
        {/each}

        {#if $savedCities.length === 0}
            <li>No saved cities</li>
        {/if}
    </ul>
</details>