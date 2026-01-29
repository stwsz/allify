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
