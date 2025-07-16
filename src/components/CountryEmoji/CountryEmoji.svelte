<script lang="ts">
	import twemoji from 'twemoji';

	export let flag: string;
	export let size: 'sm' | 'md';

	const flagHTML = twemoji.parse(flag, {
		ext: '.svg',
		folder: 'svg',
		className: 'flag',
		base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/'
	});
	const flagSrc = flagHTML.split(' ')[4].slice(5, -3);
</script>

<img src={flagSrc} alt={flag} class:sm={size === 'sm'} class:md={size === 'md'} />

<style>
	.md {
		width: 2rem;
		height: 2rem;
		margin: 0 0.1rem 0 0.2rem;
		vertical-align: -0.2rem;
	}

	.sm {
		width: 1rem;
		height: 1rem;
		margin: 0 0.05rem 0 0.1rem;
		vertical-align: -0.1rem;
	}
</style>
