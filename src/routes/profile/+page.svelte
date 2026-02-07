<script lang="ts">
	// Assets
	import DotsLoading from '$lib/assets/images/animations/DotsLoading.svelte';

	//Components
	import KeyInformation from '$lib/components/profile/KeyInformation.svelte';
	import UserSavedAlbums from '$lib/components/profile/UserSavedAlbums.svelte';
	import UserPlaylists from '$lib/components/profile/UserPlaylists.svelte';
	import UserSavedTracks from '$lib/components/profile/UserSavedTracks.svelte';

	// Stores
	import { meStore } from '$lib/stores/me.store';
	import { translationsStore } from '$lib/stores/translations.store';
</script>

<svelte:head>
	<title>{$translationsStore.profilePage.title}</title>
</svelte:head>

{#if $meStore !== undefined}
	<section class="px-8 py-8 sm:px-8 sm:py-12 lg:px-12 2xl:px-32 2xl:pt-16 2xl:pb-18">
		<h1 class="text-2xl font-medium text-t-primary sm:mb-8 sm:text-3xl lg:mb-8 lg:text-3xl">
			{$translationsStore.profilePage.profilePageHeading1.replace(
				'{{name}}',
				$meStore?.display_name ?? ''
			)}
		</h1>

		<div class="flex flex-col lg:flex-row">
			<KeyInformation userInfo={$meStore} />

			<div class="flex flex-col gap-4">
				<UserSavedTracks />

				<UserPlaylists />

				<UserSavedAlbums />
			</div>
		</div>
	</section>
{:else}
	<section class="flex items-center justify-center py-58">
		<DotsLoading />
	</section>
{/if}
