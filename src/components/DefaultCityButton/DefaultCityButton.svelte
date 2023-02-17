<script lang='ts'>
	import type { City } from "../../types/Geo";
    import { defaultCity } from "../../stores/weather";

    export let city : City;

    $: cityIsDefault = `${$defaultCity?.city}${$defaultCity?.state}${$defaultCity?.countryName}` ===`${city.city}${city.state}${city.countryName}`;

    const setAsDefault = () => {
        $defaultCity = city;
        localStorage.setItem('default', JSON.stringify(defaultCity));
    }
</script>

{#if !cityIsDefault}
    <button on:click={setAsDefault}>Set As Primary City</button>
{/if}
