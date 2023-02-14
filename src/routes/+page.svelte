<script lang='ts'>
	import { PUBLIC_URL } from '$env/static/public';
    import axios from 'axios';
    import '@picocss/pico';

    let city = '';
    let country = '';

    let data: any | undefined;

    const searchEndpoint = `${PUBLIC_URL}/api/weather/search`;

    const onSubmit = async () => {
        const result = await axios.get(searchEndpoint, {
            params: {
                city,
                country
            }
        }).then(res => res.data);

        data = result;
    }

</script>

<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->

<form on:submit|preventDefault={onSubmit}>
    <input type='text' name='city' bind:value={city} placeholder='City*' />
    <input type='text' name='country' bind:value={country} placeholder='Country'/>
    <button type='submit'>Submit</button>
</form>

{#if data}
    <p>{JSON.stringify(data)}</p>
{/if}

