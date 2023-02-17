<script lang='ts'>
    import { slide } from 'svelte/transition';
	import { savedCities } from "../../stores/weather";
	import type { City } from "../../types/Geo";
	import DefaultCityButton from '../DefaultCityButton/DefaultCityButton.svelte';

    export let city : City;

    const addCity = () => {
        $savedCities = [...$savedCities, city];
        localStorage.setItem('saved', JSON.stringify($savedCities));
    }

    const removeCity = () => {
        $savedCities = $savedCities.filter(saved => `${saved.city}, ${saved.countryCode}` !== `${city.city}, ${city.countryCode}`);
        localStorage.setItem('saved', JSON.stringify($savedCities));
    }

    $: cityIsSaved = !!$savedCities.find(saved => `${saved.city}, ${saved.countryCode}` === `${city.city}, ${city.countryCode}`);
</script>

{#if !cityIsSaved}
    <button on:click={addCity} transition:slide|local>Save City</button>
{:else}
    <DefaultCityButton city={city} />
    <button on:click={removeCity} transition:slide|local class="outline">Remove From Saved Cities</button>
{/if}