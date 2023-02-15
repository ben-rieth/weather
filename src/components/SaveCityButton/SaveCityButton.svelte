<script lang='ts'>
    import { fade } from 'svelte/transition';
	import { savedCities } from "../../stores/weather";
	import type { SavedCity } from "../../types/Geo";

    export let city : SavedCity;

    const addCity = () => {
        $savedCities = [...$savedCities, city];
    }

    $: cityIsSaved = !!$savedCities.find(saved => saved.city === city.city);
</script>

{#if !cityIsSaved}
    <button on:click={addCity}>Save City</button>
{/if}