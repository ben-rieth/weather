<script lang='ts'>
    import { slide } from 'svelte/transition';
	import { savedCities } from "../../stores/weather";
	import type { SavedCity } from "../../types/Geo";

    export let city : SavedCity;

    const addCity = () => {
        $savedCities = [...$savedCities, city];
    }

    const removeCity = () => {
        $savedCities = $savedCities.filter(saved => saved.city !== city.city && saved.country !== city.country)
    }

    $: cityIsSaved = !!$savedCities.find(saved => saved.city === city.city);
</script>

{#if !cityIsSaved}
    <button on:click={addCity} transition:slide|local>Save City</button>
{:else}
    <button on:click={removeCity} transition:slide|local>Remove From Saved Cities</button>
{/if}