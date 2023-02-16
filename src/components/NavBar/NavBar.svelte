<script>
	import SavedCitiesDropdown from "../SavedCitiesDropdown/SavedCitiesDropdown.svelte";
</script>

<nav>
    <ul>
        <li>
            <picture>
                <source srcset="/icon-white.svg" media="(prefers-color-scheme: dark)" />
                <img 
                    src="/icon-black.svg" 
                    alt="Icon"
                    class="icon" 
                />
            </picture>
        </li>
        <li>
            <strong class="website-title">Weather</strong>
        </li>
    </ul>
    <ul>
        <li><SavedCitiesDropdown /></li>
    </ul>
</nav>

<style>
    .icon {
        width: 1.5rem;
    }

    .website-title {
        font-size: 1.5rem;
    }
</style>