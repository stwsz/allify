<script lang="ts">
	// Svelte
	import { onMount } from 'svelte';

	// Assets
	import DotsLoading from '$lib/assets/images/animations/DotsLoading.svelte';

	// Components
	import TopArtistItem from './TopArtistItem.svelte';
	import MostListenedArtistItem from './MostListenedArtistItem.svelte';
	import TopTrackItem from './TopTrackItem.svelte';
	import MostListenedTrackItem from './MostListenedTrackItem.svelte';
	import CarouselButton from './CarouselButton.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let mostListenedType: 'artists' | 'tracks' | 'albums' = 'artists';
	export let choosedItemType: 'artist' | 'track' | 'album' | '';
	export let showDetailedInfoModalVisible: boolean;
	export let itemId: string;

	let mostListenedItems: any[] = [];
	let topListened: any = null;

	let carousel: HTMLDivElement;
	let showPrevButton = false;
	let showNextButton = true;

	async function fetchMostListenedItems() {
		try {
			const reqMostListenedItems = await fetch(`/api/spotify/most-listened-${mostListenedType}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ locale: $translationsStore.locale })
			});

			if (!reqMostListenedItems.ok) {
				return;
			}

			const resMostListenedItems = await reqMostListenedItems.json();
			mostListenedItems = resMostListenedItems;
			topListened = mostListenedItems[0];

			sessionStorage.setItem(
				`mostListened${mostListenedType.charAt(0).toUpperCase() + mostListenedType.slice(1)}`,
				JSON.stringify(mostListenedItems)
			);
		} catch (error) {
			console.error('Error fetching most listened artists:', error);
		}
	}

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
		const mostListenedItemsFromStorage = sessionStorage.getItem(
			`mostListened${mostListenedType.charAt(0).toUpperCase() + mostListenedType.slice(1)}`
		);

		if (mostListenedItemsFromStorage) {
			mostListenedItems = JSON.parse(mostListenedItemsFromStorage);
			topListened = mostListenedItems[0];
		} else {
			fetchMostListenedItems();
		}

		if (carousel) {
			updateButtonVisibility();
		}
	});
</script>

<section
	class={`px-8 py-8 sm:px-8 sm:py-12 lg:px-12 lg:pt-16 ${mostListenedType === 'tracks' ? 'lg:pb-28' : 'lg:pb-8'} 2xl:px-32`}
	id="most-listened-artists-section"
>
	<h2 class="mb-4.5 text-2xl font-medium text-t-primary sm:mb-8 sm:text-3xl lg:mb-8 lg:text-3xl">
		{#if mostListenedType === 'artists'}
			{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedArtistsHeading1}
		{:else if mostListenedType === 'tracks'}
			{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedTracksHeading1}
		{/if}
	</h2>

	{#if mostListenedItems.length > 0}
		<div class="relative">
			{#if showPrevButton}
				<CarouselButton direction="prev" on:click={scrollPrev} />
			{/if}

			<div
				bind:this={carousel}
				on:scroll={handleScroll}
				id="carousel"
				class="flex snap-x snap-mandatory items-end gap-4 overflow-x-auto overflow-y-hidden scroll-smooth px-4 sm:mx-0 sm:gap-6 sm:px-0 lg:gap-8 lg:overflow-x-hidden xl:gap-12"
			>
				<div class="shrink-0 snap-start">
					{#if mostListenedType === 'artists'}
						<TopArtistItem
							topArtistItem={topListened}
							bind:choosedItemType
							bind:itemId
							bind:showDetailedInfoModalVisible
						/>
					{:else if mostListenedType === 'tracks'}
						<TopTrackItem
							topTrackItem={topListened}
							bind:choosedItemType
							bind:itemId
							bind:showDetailedInfoModalVisible
						/>
					{/if}
				</div>

				{#if mostListenedType === 'artists'}
					{#each mostListenedItems.slice(1) as mostListenedArtistItem, index}
						<div class="shrink-0 snap-start overflow-hidden">
							<MostListenedArtistItem
								{mostListenedArtistItem}
								{index}
								bind:choosedItemType
								bind:itemId
								bind:showDetailedInfoModalVisible
							/>
						</div>
					{/each}
				{:else if mostListenedType === 'tracks'}
					{#each mostListenedItems.slice(1) as mostListenedTrackItem, index}
						<div class="shrink-0 snap-start overflow-hidden">
							<MostListenedTrackItem
								{mostListenedTrackItem}
								{index}
								bind:choosedItemType
								bind:itemId
								bind:showDetailedInfoModalVisible
							/>
						</div>
					{/each}
				{/if}
			</div>

			{#if showNextButton}
				<CarouselButton direction="next" on:click={scrollNext} />
			{/if}
		</div>
	{:else}
		<div class="flex justify-center py-8">
			<DotsLoading animationAltText={$translationsStore.generalTexts.loadingComponentAriaLabel} />
		</div>
	{/if}
</section>
