<script lang='ts'>

    export let name : string | undefined;
    export let link : string | undefined;
</script>

{#if name && link}
    <small>
        Photographer: 
        {name} 
        <a href={link} 
            target="_blank" 
            rel="noreferrer"
        >
            {link}
        </a>
    </small>
{/if}