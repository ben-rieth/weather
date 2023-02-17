<script>
	import { onMount } from "svelte";


    let getAtLocationOnStartup = false;

    $: () => {
        if (getAtLocationOnStartup) {
            navigator.geolocation.getCurrentPosition(
                () => console.log('permission granted'),
                () => console.log('permission not granted')
            );
        }
        localStorage.setItem('getAtLocationOnStartup', `${getAtLocationOnStartup}`);
    }

    onMount(() => {
        getAtLocationOnStartup = localStorage.getItem('getAtLocationOnStartup') === 'true';
    })
</script>

<article>
    <header>
        <h3>Settings</h3>
    </header>

    <label for="switch">
        <input 
            type="checkbox" 
            id="switch" 
            name="switch" 
            role="switch"
            bind:checked={getAtLocationOnStartup}
        >
        Get Weather At Your Location on Startup
    </label>
</article>