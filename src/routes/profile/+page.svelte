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
	<section class="base-section">
		<h1>
			{$translationsStore.profilePage.profilePageHeading1.replace(
				'{{name}}',
				$meStore?.display_name ?? ''
			)}
		</h1>

		<div class="flex flex-col lg:flex-row lg:gap-10">
			<KeyInformation userInfo={$meStore} />

			<div class="flex w-full flex-col gap-10 lg:w-9/12">
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
