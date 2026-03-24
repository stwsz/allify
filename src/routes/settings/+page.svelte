<script lang="ts">
	// Assets
	import SpotifyIcon from '$lib/assets/images/icons/streamings/SpotifyIcon.svelte';
	import DeezerIcon from '$lib/assets/images/icons/streamings/DeezerIcon.svelte';

	// Components
	import ConnectedPlatform from '$lib/components/settings/ConnectedPlatform.svelte';
	import NotLogged from '$lib/components/general/NotLogged.svelte';

	// Stores
	import { meStore } from '$lib/stores/me.store';
	import { translationsStore } from '$lib/stores/translations.store';

	const platforms = [
		{ name: 'spotify', icon: SpotifyIcon, iconClass: 'text-spotify' },
		{ name: 'deezer', icon: DeezerIcon, iconClass: 'text-deezer' }
	] as const;
</script>

<svelte:head>
	<title>{$translationsStore.settingsPage.title}</title>
</svelte:head>

{#if $meStore !== undefined}
	<section class="base-section">
		<h1>{$translationsStore.settingsPage.title}</h1>

		<div class="flex flex-col items-start gap-2 mt-3">
			<h2 class="text-xl font-medium text-t-primary">
				{$translationsStore.settingsPage.settingsPageConnectedPlatformsSectionHeading2}
			</h2>

			<p class="mt-1 mb-6 text-sm text-t-secondary">
				{$translationsStore.settingsPage.settingsPageConnectedPlatformsSectionParagraph1}
			</p>

			<div class="flex flex-col items-center gap-5 w-full md:flex-row">
				{#each platforms as platform}
					<ConnectedPlatform {platform} />
				{/each}
			</div>
		</div>
	</section>
{:else}
	<NotLogged notLoggedParagraph={$translationsStore.generalTexts.notLoggedSettingsParagraph1} />
{/if}
