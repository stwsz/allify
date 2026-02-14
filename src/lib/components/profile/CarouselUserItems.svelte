<script lang="ts">
	// Svelte
	import { onMount } from 'svelte';

	// Components
	import CarouselButton from '../general/buttons/CarouselButton.svelte';
	import UserSavedTracksItems from './UserSavedTracksItems.svelte';
	import UserPlaylistsItems from './UserPlaylistsItems.svelte';
	import UserSavedAlbumsItems from './UserSavedAlbumsItems.svelte';

	// Props
	export let items: any[];
	export let itemsType: string;

	let carousel: HTMLDivElement;
	let showPrevButton = false;
	let showNextButton = true;

	function updateButtonVisibility() {
		if (!carousel) return;

		const scrollLeft = carousel.scrollLeft;
		const maxScroll = carousel.scrollWidth - carousel.clientWidth;

		showPrevButton = scrollLeft > 10;
		showNextButton = scrollLeft < maxScroll - 10;
	}

	function scrollNext() {
		if (carousel) {
			const scrollAmount = window.innerWidth < 640 ? 280 : window.innerWidth < 1024 ? 350 : 420;
			carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
		}
	}

	function scrollPrev() {
		if (carousel) {
			const scrollAmount = window.innerWidth < 640 ? 280 : window.innerWidth < 1024 ? 350 : 420;
			carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
		}
	}

	function handleScroll() {
		updateButtonVisibility();
	}

	onMount(() => {
		if (carousel) {
			updateButtonVisibility();
		}
	});
</script>

<div class="relative">
	{#if showPrevButton}
		<CarouselButton direction="prev" on:click={scrollPrev} />
	{/if}

	<div
		bind:this={carousel}
		on:scroll={handleScroll}
		id="carousel"
		class="flex snap-x snap-mandatory items-end gap-4 overflow-x-auto overflow-y-hidden scroll-smooth px-4 sm:mx-0 sm:gap-6 sm:px-0 lg:gap-8 lg:overflow-x-hidden lg:py-2"
	>
		{#if itemsType === 'user-saved-tracks'}
			{#each items as item}
				<UserSavedTracksItems {item} />
			{/each}
		{:else if itemsType === 'user-playlists'}
			{#each items as item}
				<UserPlaylistsItems {item} />
			{/each}
		{:else if itemsType === 'user-saved-albums'}
			{#each items as item}
				<UserSavedAlbumsItems {item} />
			{/each}
		{/if}
	</div>

	{#if showNextButton}
		<CarouselButton direction="next" on:click={scrollNext} />
	{/if}
</div>
