<script>
	import {setContext} from 'svelte'
	import {writable} from 'svelte/store'
	
	let highlighted = writable({})
	setContext('highlighted', highlighted)
</script>

<slot />