<script lang="ts">
	// Components
	import ConnectedPlatforms from '$lib/components/settings/connected-platforms/ConnectedPlatforms.svelte';
	import NotLogged from '$lib/components/general/NotLogged.svelte';

	// Stores
	import { meStore } from '$lib/stores/me.store';
	import { translationsStore } from '$lib/stores/translations.store';
</script>

<svelte:head>
	<title>{$translationsStore.settingsPage.title}</title>
</svelte:head>

{#if $meStore !== undefined}
	<section class="base-section">
		<h1>{$translationsStore.settingsPage.settingsPageHeading1}</h1>

		<ConnectedPlatforms />
	</section>
{:else}
	<NotLogged notLoggedParagraph={$translationsStore.generalTexts.notLoggedSettingsParagraph1} />
{/if}
