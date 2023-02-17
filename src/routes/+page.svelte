<script lang='ts'>
    import { weatherStatus, weatherData } from '../stores/weather';
    import '@picocss/pico';
    import 'bootstrap-icons/font/bootstrap-icons.css';
	import SearchForm from '../components/SearchForm/SearchForm.svelte';
	import WeatherData from '../components/WeatherData/WeatherData.svelte';
	import NavBar from '../components/NavBar/NavBar.svelte';
	import Footer from '../components/Footer/Footer.svelte';
	import SavedCitiesDropdown from '../components/SavedCitiesDropdown/SavedCitiesDropdown.svelte';
	import Settings from '../components/Settings/Settings.svelte';
    import axios from 'axios';
	import { PUBLIC_URL } from '$env/static/public';
    import { onMount } from 'svelte';

    const coordsEndpoint = `${PUBLIC_URL}/api/weather/coords`
    
    const getPositionSuccess : PositionCallback = async (pos) => {

        try {
            const data = await axios.get(coordsEndpoint, {
                params: {
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude,
                }
            }).then(res => res.data);

            $weatherData = data;

            $weatherStatus = 'success';
        } catch (err) {
            $weatherStatus = 'error';
        }
    };

    const getPositionFailure : PositionErrorCallback = (err) => {
        $weatherStatus = 'error';
    }

    const userLocation = async () => {
        $weatherStatus = 'loading';

        navigator.geolocation.getCurrentPosition(
            getPositionSuccess,
            getPositionFailure,
        );
    }

    onMount(async () => {
        if (localStorage.getItem('getAtLocationOnStartup') === 'true') {
            await userLocation();
        }

        $weatherStatus = 'untouched';
    })
</script>

<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->

<main class="container">
    <NavBar />

    <SavedCitiesDropdown />

    {#if $weatherStatus === 'loading'}
        <article class="fetching">
            <progress />
        </article>
    {:else if $weatherStatus === 'untouched'}
        <SearchForm />
    {:else if $weatherStatus === 'success'}
        <WeatherData />
        <SearchForm />
    {:else if $weatherStatus === 'error'}
        <article>Weather could not be retrieved</article>
        <SearchForm />
    {/if}

    <Settings />

    <Footer />
</main>

<style>
    .fetching {
        height: 50vh;
    }
</style>