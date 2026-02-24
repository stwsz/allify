<script lang="ts">
	// Assets
	import NotLogged from '$lib/components/general/NotLogged.svelte';

	//Components
	import KeyInformation from '$lib/components/profile/KeyInformation.svelte';
	import UserSavedAlbums from '$lib/components/profile/saved-albums/UserSavedAlbums.svelte';
	import UserPlaylists from '$lib/components/profile/user-playlists/UserPlaylists.svelte';
	import UserSavedTracks from '$lib/components/profile/saved-tracks/UserSavedTracks.svelte';

	// Stores
	import { meStore } from '$lib/stores/me.store';
	import { translationsStore } from '$lib/stores/translations.store';
</script>

<svelte:head>
	<title>{$translationsStore.profilePage.title}</title>
</svelte:head>

{#if $meStore !== undefined}
	<section class="base-section">
		<div class="mx-auto flex w-full flex-col gap-10 sm:gap-12 lg:gap-14">
			<KeyInformation userInfo={$meStore} />

			<div class="flex w-full flex-col gap-8 sm:gap-10">
				<UserSavedTracks />

				<UserPlaylists />

				<UserSavedAlbums />
			</div>
		</div>
	</section>
{:else}
	<NotLogged
		notLoggedParagraph={$translationsStore.generalTexts.notLoggedMyMusicProfileParagraph1}
	/>
{/if}
