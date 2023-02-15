<script lang='ts'>
    import { weatherData, weatherStatus } from '../stores/weather';
    import '@picocss/pico';
	import SearchForm from '../components/SearchForm/SearchForm.svelte';
	import SavedCitiesDropdown from '../components/SavedCitiesDropdown/SavedCitiesDropdown.svelte';

</script>

<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->

<main class="container">
    <nav>
        <ul>
            <li><h1>Svelte Weather</h1></li>
        </ul>
        <ul>
            <li><SavedCitiesDropdown /></li>
        </ul>
    </nav>
    {#if $weatherStatus === 'loading'}
        <article>
            <progress />
        </article>
    {:else if $weatherStatus === 'untouched'}
        <article>
            Search below to see the weather!
        </article>
    {:else if $weatherStatus === 'success'}
        <article>{JSON.stringify($weatherData)}</article>
    {:else if $weatherStatus === 'error'}
        <article>Weather could not be retrieved</article>
    {/if}

    <SearchForm />
</main>

