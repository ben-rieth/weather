<script lang='ts'>
    import { weatherData, weatherStatus } from '../stores/weather';
    import '@picocss/pico';
    import 'bootstrap-icons/font/bootstrap-icons.css';
	import SearchForm from '../components/SearchForm/SearchForm.svelte';
	import SavedCitiesDropdown from '../components/SavedCitiesDropdown/SavedCitiesDropdown.svelte';
	import WeatherData from '../components/WeatherData/WeatherData.svelte';

</script>

<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->

<main class="container">
    <nav>
        <ul>
            <li>
                <picture>
                    <source srcset="/icon-white.svg" media="(prefers-color-scheme: dark)" />
                    <img 
                        src="/icon-black.svg" 
                        alt="Icon"
                        class="icon" 
                    />
                </picture>
            </li>
            <li>
                <strong class="website-title">Weather</strong>
            </li>
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
        <WeatherData />
    {:else if $weatherStatus === 'error'}
        <article>Weather could not be retrieved</article>
    {/if}

    <SearchForm />
</main>

<style>
    .icon {
        width: 1.5rem;
    }

    .website-title {
        font-size: 1.5rem;
    }
</style>