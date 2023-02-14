<script lang='ts'>
	import { PUBLIC_URL } from "$env/static/public";
	import axios from "axios";
    import { weatherStatus, weatherData } from "../../stores/weather";

    const coordsEndpoint = `${PUBLIC_URL}/api/weather/coords`

    const userLocation = async () => {
        $weatherStatus = 'loading';

        navigator.geolocation.getCurrentPosition(
            async (pos) => {

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
            },
            () => {
                console.log("Failure to get user coords")
                $weatherStatus = 'error';
            }
        )
    }
</script>

<button on:click={userLocation}>Search At Your Location</button>