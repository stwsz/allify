<script lang="ts">
	// Components
	import NotLogged from '$lib/components/general/NotLogged.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { meStore } from '$lib/stores/me.store';
</script>

<svelte:head>
	<title>{$translationsStore.discoveriesPage.title}</title>
</svelte:head>

{#if $meStore !== undefined}
	<NotLogged
		notLoggedParagraph={$translationsStore.generalTexts.notLoggedMyMusicProfileParagraph1}
	/>
{/if}
