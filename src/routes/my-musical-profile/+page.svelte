<script lang="ts">
	// Components
	import CarouselMyMusicalProfile from '$lib/components/my-musical-profile/CarouselMyMusicalProfile.svelte';
	import ShowDetailedItemInfoModal from '$lib/components/my-musical-profile/ShowDetailedItemInfoModal.svelte';
	import NotLogged from '$lib/components/general/NotLogged.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { meStore } from '$lib/stores/me.store';

	const itemsType: Array<'artists' | 'tracks' | 'albums'> = ['artists', 'tracks'];

	$: showDetailedInfoModalVisible = false;

	$: choosedItemType = '' as 'artist' | 'track' | 'album' | '';
	$: itemId = '' as string;
</script>

<svelte:head>
	<title>{$translationsStore.myMusicalProfilePage.title}</title>
</svelte:head>

{#if $meStore !== undefined}
	<h1
		class="
		px-8 pt-14 pb-6
		text-3xl leading-tight font-medium
		text-t-primary
		sm:text-3xl
		lg:px-12 lg:pt-20 lg:pb-2 lg:text-4xl
		2xl:px-32
	"
	>
		{$translationsStore.myMusicalProfilePage.myMusicalProfilePageHeading1}
	</h1>

	{#each itemsType as type}
		<CarouselMyMusicalProfile
			mostListenedType={type}
			bind:choosedItemType
			bind:itemId
			bind:showDetailedInfoModalVisible
		/>
	{/each}

	{#if choosedItemType && itemId}
		<ShowDetailedItemInfoModal bind:choosedItemType bind:itemId bind:showDetailedInfoModalVisible />
	{/if}
{:else}
	<NotLogged
		notLoggedParagraph={$translationsStore.generalTexts.notLoggedMyMusicProfileParagraph1}
	/>
{/if}
