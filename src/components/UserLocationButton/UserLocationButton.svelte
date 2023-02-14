<script lang='ts'>
    import { weatherStatus } from "../../stores/weather";


    const userLocation = async () => {
        $weatherStatus = 'loading';

        $weatherStatus = 'success';
    }
</script>

<button on:click={userLocation}>Search At Your Location</button>