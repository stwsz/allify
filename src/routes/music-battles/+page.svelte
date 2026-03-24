<script lang="ts">
	// Components
	import NotLogged from '$lib/components/general/NotLogged.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { meStore } from '$lib/stores/me.store';
</script>

<svelte:head>
	<title>{$translationsStore.musicBattlesPage.title}</title>
</svelte:head>

{#if $meStore !== undefined}
	<h1>Music battles generic heading</h1>
{:else}
	<NotLogged notLoggedParagraph={$translationsStore.generalTexts.notLoggedMusicBattlesParagraph1} />
{/if}
