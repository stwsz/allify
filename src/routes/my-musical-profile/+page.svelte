<script lang="ts">
	// Components
	import MostListenedArtistsItems from '$lib/components/my-musical-profile/most-listened-artists/MostListenedArtistsItems.svelte';
	import MostListenedTracksItems from '$lib/components/my-musical-profile/most-listened-tracks/MostListenedTracksItems.svelte';
	import NotLogged from '$lib/components/general/NotLogged.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { meStore } from '$lib/stores/me.store';

	const itemsType: Array<'artists' | 'tracks'> = ['artists', 'tracks'];
</script>

<svelte:head>
	<title>{$translationsStore.myMusicalProfilePage.title}</title>
</svelte:head>

{#if $meStore !== undefined}
	<section class="base-section">
		<h1 class="mb-4 lg:mb-10">
			{$translationsStore.myMusicalProfilePage.myMusicalProfilePageHeading1}
		</h1>

		<div class="space-y-12 lg:space-y-20">
			{#each itemsType as type}
				{#if type === 'artists'}
					<MostListenedArtistsItems />
				{:else if type === 'tracks'}
					<MostListenedTracksItems />
				{/if}
			{/each}
		</div>
	</section>
{:else}
	<NotLogged
		notLoggedParagraph={$translationsStore.generalTexts.notLoggedMyMusicProfileParagraph1}
	/>
{/if}
