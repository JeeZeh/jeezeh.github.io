<script>
	export let open = false;
	import { slide } from 'svelte/transition';
	const handleClick = () => (open = !open);
</script>

<div class="accordion">
	<div class="header" on:click={handleClick}>
		<div class="text">
			<slot name="head" />
		</div>
	</div>

	{#if open}
		<div class="details" transition:slide>
			<slot name="details" />
		</div>
	{/if}
</div>

<style>
	div.header {
		display: flex;
		width: 100%;
        cursor: pointer;
	}

	div.header .text {
		flex: 1;
		margin-right: 5px;
	}

	div.details {
		padding: 1rem;
	}
</style>
