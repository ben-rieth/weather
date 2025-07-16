<script>
	import { weatherData, weatherError, weatherStatus } from '../../stores/weather';
	import { PUBLIC_URL } from '$env/static/public';
	import axios from 'axios';
	import UserLocationButton from '../UserLocationButton/UserLocationButton.svelte';
	import { SEARCH_ENDPOINT } from '$lib/constants/urls';

	let city = '';
	let country = '';

	const searchLocation = async () => {
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		$weatherStatus = 'loading';
		try {
			const result = await axios
				.get(SEARCH_ENDPOINT, {
					params: {
						city,
						country
					}
				})
				.then((res) => res.data);
			$weatherData = result;
			$weatherStatus = 'success';
			$weatherError = '';
		} catch (err) {
			$weatherStatus = 'error';
		}
	};
</script>

<article>
	<header>
		<h3>Search Location</h3>
	</header>
	<form on:submit|preventDefault={searchLocation}>
		<input type="text" name="city" bind:value={city} placeholder="City*" required />
		<input type="text" name="country" bind:value={country} placeholder="Country" />
		<button type="submit">Submit</button>
	</form>
	<footer>
		<UserLocationButton />
	</footer>
</article>
