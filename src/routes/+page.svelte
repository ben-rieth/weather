<script lang='ts'>
    import { weatherData } from '../stores/weather';
	import { PUBLIC_URL } from '$env/static/public';
    import axios from 'axios';
    import '@picocss/pico';

    let city = '';
    let country = '';
    let status = 'untouched';

    const searchEndpoint = `${PUBLIC_URL}/api/weather/search`;

    const searchLocation = async () => {
        status ='loading';
        try {
            const result = await axios.get(searchEndpoint, {
                params: {
                    city,
                    country
                }
            }).then(res => res.data);

            $weatherData = result;
            status = 'success';
        } catch (err) {
            status = 'error';
        } 
    }

    const userLocation = async () => {
        status = 'loading';

        status = 'success';
    }

</script>

<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->

<main class="container">
    <nav>
        <ul>
            <li><h1>Svelte Weather</h1></li>
        </ul>
    </nav>

    {#if status === 'loading'}
        <article aria-busy="true" />
    {:else if status === 'untouched'}
        <article>
            Search below to see the weather!
        </article>
    {:else if status === 'success'}
        <article>{JSON.stringify($weatherData)}</article>
    {:else if status === 'error'}
        <article>Weather could not be retrieved</article>
    {/if}

    <article>
        <header>
            <h3>Search Location</h3>
        </header>
        <form on:submit|preventDefault={searchLocation}>
            <input type='text' name='city' bind:value={city} placeholder='City*' />
            <input type='text' name='country' bind:value={country} placeholder='Country'/>
            <button type='submit'>Submit</button>
        </form>
        <footer>
            <button on:click={userLocation}>Search At Your Location</button>
        </footer>
    </article>
</main>

