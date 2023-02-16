<script lang='ts'>
    import { weatherStatus } from '../stores/weather';
    import '@picocss/pico';
    import 'bootstrap-icons/font/bootstrap-icons.css';
	import SearchForm from '../components/SearchForm/SearchForm.svelte';
	import WeatherData from '../components/WeatherData/WeatherData.svelte';
	import NavBar from '../components/NavBar/NavBar.svelte';
	import Footer from '../components/Footer/Footer.svelte';
	import SavedCitiesDropdown from '../components/SavedCitiesDropdown/SavedCitiesDropdown.svelte';

</script>

<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->

<main class="container">
    <NavBar />

    <SavedCitiesDropdown />

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

    <Footer />
</main>