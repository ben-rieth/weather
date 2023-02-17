<script lang='ts'>
    let getAtLocationOnStartup = typeof window !== 'undefined' && localStorage.getItem('getAtLocationOnStartup') === 'true';

    $: getAtLocationOnStartup && navigator.geolocation.getCurrentPosition(
                () => console.log('permission granted'),
                () => console.log('permission not granted')
            );
    
    $: typeof window !== 'undefined' && localStorage.setItem('getAtLocationOnStartup', `${getAtLocationOnStartup}`);
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