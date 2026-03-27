<script lang="ts">
	// Svelte
	import { page } from '$app/stores';

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
	<!-- General -->
	<title>{$translationsStore.profilePage.title}</title>
	<meta name="description" content={$translationsStore.profilePage.profilePageMetaDescription} />
	<link rel="canonical" href={`https://allify.app${$page.url.pathname}`} />
	<!-- Open Graph -->
	<meta property="og:locale" content={$translationsStore.configuration.langAttribute} />
	<meta property="og:url" content={`https://allify.app${$page.url.pathname}`} />
	<meta property="og:title" content={$translationsStore.profilePage.title} />
	<meta
		property="og:description"
		content={$translationsStore.profilePage.profilePageMetaOgAndTwitterContent}
	/>
	<!-- Twitter Card -->
	<meta name="twitter:url" content={`https://allify.app${$page.url.pathname}`} />
	<meta name="twitter:title" content={$translationsStore.profilePage.title} />
	<meta
		name="twitter:description"
		content={$translationsStore.profilePage.profilePageMetaOgAndTwitterContent}
	/>
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
	<NotLogged notLoggedParagraph={$translationsStore.generalTexts.notLoggedProfileParagraph1} />
{/if}
