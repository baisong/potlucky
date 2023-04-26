<script>
	import {setContext} from 'svelte'
	import {writable} from 'svelte/store'
	
	let highlighted = writable({})
	setContext('highlighted', highlighted)
</script>

<div class="highlight-wrapper">
<slot />
</div>

<style>
	.highlight-wrapper {
		padding: 0.25em;
		margin: 1em 0;
		display: flex;
		width: 100%;
		justify-content: center;
	}
</style>