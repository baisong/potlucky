<script>
	import {getContext} from 'svelte'
	
	const highlighted = getContext('highlighted')
	
	let id = Math.floor(Math.random() * Date.now())
	let highlight = false
	
	$: highlight = $highlighted[id]
	
	const handleClick = () => {
		if (!highlight) {
			highlight = true
			$highlighted = {[id]: true}
			console.log($highlighted)
		} else {
			highlight = false
			$highlighted = {}
		}
	}
</script>

<button class:highlight on:click={handleClick}>
	Highlight
</button>

<style>
	.highlight {
		background-color: yellow;
        color: black;
	}
</style>