<script lang='ts'>
    import { defaultCityModalOpen } from "../../stores/weather";
	import type { City } from "../../types/Geo";

    export let city : City;

    const openModal = () => {
        document.documentElement.classList.add('modal-is-open', 'modal-is-opening');

        setTimeout(() => {
            document.documentElement.classList.remove('modal-is-opening')
        }, 400);
    }

    const closeModal = () => {
        document.documentElement.classList.add('modal-is-closing');
        setTimeout(() => {
            document.documentElement.classList.remove('modal-is-open', 'modal-is-closing');
        }, 400);

        $defaultCityModalOpen = false;
    }

    const handleYesClick = () => {
        localStorage.setItem('default', JSON.stringify(city));
        closeModal();
    }

    // const closeOnOutsideClick = (e: Event) => {
    //     if ($defaultCityModalOpen) {
    //         const modalContent = document.getElementById('set-default-modal');
    //         const isClickInside = modalContent?.contains((e.target as Node));

    //         !isClickInside && closeModal();
    //     }
    // }
    
    $: console.log($defaultCityModalOpen);
</script>

<!-- <svelte:window
    on:keydown={(e) => {
        if ($defaultCityModalOpen && e.key === 'Escape') {
            closeModal();
        }
    }}
    on:click={closeOnOutsideClick}
/> -->

<dialog open={$defaultCityModalOpen}>
    <article id="set-default-modal">
        <h3>Set {city.city} As Default?</h3>
        <p>Your default city will open automatically the next time you come to the site!</p>
        <footer>
            <a class="secondary" href="#cancel" role="button" on:click={closeModal}>No Thanks</a>
            <a href="#confirm" role="button" on:click={handleYesClick}>Yes, Please!</a>
        </footer>
    </article>
</dialog>