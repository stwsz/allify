<script lang="ts">
	// Svelte
	import { createEventDispatcher } from 'svelte';

	// Assets
	import ArrowIcon from '$lib/assets/images/icons/ArrowIcon.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	export let direction: 'prev' | 'next' = 'next';

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('click');
	}
</script>

<button
	on:click={handleClick}
	class={`absolute top-1/2 z-20 hidden h-full -translate-y-1/2
		cursor-pointer items-center justify-center bg-s-inverse/80 p-2
		shadow-lg backdrop-blur-md transition-all
		duration-200 hover:scale-110 hover:bg-s-inverse lg:flex lg:p-3
		${direction === 'prev' ? 'left-0' : 'right-0'}`}
	aria-label={direction === 'prev'
		? $translationsStore.myMusicalProfilePage.myMusicalProfilePageCarouselButtonAriaLabelPrev
		: $translationsStore.myMusicalProfilePage.myMusicalProfilePageCarouselButtonAriaLabelNext}
>
	<ArrowIcon
		iconSvgClass={`${direction === 'prev' ? 'rotate-90' : '-rotate-90'} h-7 w-7 lg:h-9 lg:w-9 text-t-inverse`}
		iconAltText={$translationsStore.myMusicalProfilePage
			.myMusicalProfilePageCarouselArrowIconAltText}
	/>
</button>
