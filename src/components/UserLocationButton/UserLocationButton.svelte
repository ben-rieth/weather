<script lang="ts">
	import axios from 'axios';
	import { weatherStatus, weatherData } from '../../stores/weather';
	import { COORDS_ENDPOINT } from '$lib/constants/urls';

	const getPositionSuccess: PositionCallback = async (pos) => {
		$weatherStatus = 'loading';
		document.body.scrollTop = document.documentElement.scrollTop = 0;

		try {
			const data = await axios
				.get(COORDS_ENDPOINT, {
					params: {
						lat: pos.coords.latitude,
						lon: pos.coords.longitude
					}
				})
				.then((res) => res.data);
			console.log(data);
			$weatherData = data;

			$weatherStatus = 'success';
		} catch (err) {
			$weatherStatus = 'error';
		}
	};

	const getPositionFailure: PositionErrorCallback = () => {
		$weatherStatus = 'error';
	};

	const userLocation = async () => {
		$weatherStatus = 'loading';
		navigator.geolocation.getCurrentPosition(getPositionSuccess, getPositionFailure);
	};
</script>

<button on:click={userLocation}>Search At Your Location</button>
