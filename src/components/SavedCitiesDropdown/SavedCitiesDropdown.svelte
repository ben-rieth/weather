<script lang='ts'>
    import { onMount, onDestroy } from 'svelte';
	import type { SavedCity } from '../../types/Geo';

    let saved : SavedCity[] = [];

    onMount(async () => {
        const _storageData = localStorage.getItem('saved');

        if (_storageData) {
            saved = JSON.parse(_storageData);
        }
    });

    onDestroy(async () => {
        localStorage.setItem('saved', JSON.stringify(saved));
    })
</script>

<details role="list">
    <summary aria-haspopup="listbox">Saved Cities</summary>
    <ul role="listbox">
        {#each saved as city}
            <li>{city.city}, {city.country}</li>
        {/each}

        <li>Add City</li>

    </ul>
</details>