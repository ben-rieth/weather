<script lang="ts">
	import axios from 'axios';
	import { weatherStatus, weatherData, weatherError } from '../../stores/weather';
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
			$weatherError = '';
		} catch (err) {
			$weatherStatus = 'error';
		}
	};

	const getPositionFailure: PositionErrorCallback = (err) => {
		$weatherStatus = 'error';
		switch (err.code) {
			case 1:
				$weatherError = 'Failed to get location because permission is denied.';
				break;
			case 2:
			case 3:
			default:
				$weatherError = 'Failed to get location';
				break;
		}
	};

	const userLocation = async () => {
		$weatherStatus = 'loading';
		navigator.geolocation.getCurrentPosition(getPositionSuccess, getPositionFailure);
	};
</script>

<button on:click={userLocation}>Search At Your Location</button>
