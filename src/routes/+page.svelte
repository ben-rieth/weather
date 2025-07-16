<script lang="ts">
	import { weatherStatus, weatherData, weatherError } from '../stores/weather';
	import '@picocss/pico';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import SearchForm from '../components/SearchForm/SearchForm.svelte';
	import WeatherData from '../components/WeatherData/WeatherData.svelte';
	import NavBar from '../components/NavBar/NavBar.svelte';
	import Footer from '../components/Footer/Footer.svelte';
	import SavedCitiesDropdown from '../components/SavedCitiesDropdown/SavedCitiesDropdown.svelte';
	import Settings from '../components/Settings/Settings.svelte';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { COORDS_ENDPOINT } from '$lib/constants/urls';

	onMount(async () => {
		if (localStorage.getItem('getAtLocationOnStartup') === 'true') {
			navigator.geolocation.getCurrentPosition(
				async (pos) => {
					$weatherStatus = 'loading';

					try {
						const data = await axios
							.get(COORDS_ENDPOINT, {
								params: {
									lat: pos.coords.latitude,
									lon: pos.coords.longitude
								}
							})
							.then((res) => res.data);

						$weatherData = data;

						$weatherStatus = 'success';
						$weatherError = '';
					} catch (err) {
						$weatherStatus = 'error';
					}
				},
				() => ($weatherStatus = 'error')
			);
		}

		$weatherStatus = 'untouched';
	});
</script>

<svelte:window
	on:beforeunload={() => (document.body.scrollTop = document.documentElement.scrollTop = 0)}
/>

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
	{:else if $weatherStatus === 'error' && $weatherError.length > 0}
		<article>{$weatherError.length > 0 ? $weatherError : 'Weather could not be retrieved'}</article>
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
