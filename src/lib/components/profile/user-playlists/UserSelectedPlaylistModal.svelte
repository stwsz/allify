<script lang="ts">
	// Assets
	import CloseIcon from '$lib/assets/images/icons/CloseIcon.svelte';

	// Components
	import ExternalLink from '$lib/components/general/ExternalLink.svelte';
	import MusicFromPlaylist from './MusicFromPlaylist.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let playlist: any;
	export let showSelectedPlaylistModal: boolean;

	let musicsFromPlaylist: any[] = [];
	let isLoading = true;

	function getStorageKey() {
		return `musics-from-playlist-${playlist.id}`;
	}

	async function getMusicsFromPlaylist(): Promise<any[]> {
		try {
			const req = await fetch('/api/spotify/musics-from-playlist', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ playlistTracksHref: playlist.tracks.href })
			});

			if (!req.ok) throw new Error('Failed to fetch musics');

			const data = await req.json();

			sessionStorage.setItem(getStorageKey(), JSON.stringify(data));

			return data;
		} catch {
			return [];
		}
	}

	$: if (playlist?.id && showSelectedPlaylistModal) {
		loadMusics();
	}

	async function loadMusics() {
		isLoading = true;

		const storage = sessionStorage.getItem(getStorageKey());

		if (storage) {
			musicsFromPlaylist = JSON.parse(storage);
		} else {
			musicsFromPlaylist = await getMusicsFromPlaylist();
		}

		isLoading = false;
	}
</script>

{#if showSelectedPlaylistModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-s-inverse/60 p-4 backdrop-blur-md"
	>
		<div
			class="relative flex h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-b-default bg-s-default shadow-xl"
		>
			<button
				class="absolute top-5 right-5 z-10 cursor-pointer opacity-70 transition hover:scale-105 hover:opacity-100"
				on:click={() => (showSelectedPlaylistModal = false)}
				aria-label={$translationsStore.profilePage
					.profilePageUserSelectedPlaylistCloseButtonAriaLabel +
					' ' +
					playlist.name}
			>
				<CloseIcon
					iconAltText={$translationsStore.profilePage
						.profilePageUserSelectedPlaylistCloseButtonAriaLabel +
						' ' +
						playlist.name}
					iconSvgClass="w-5 h-5 text-brand-primary"
				/>
			</button>

			<div class="border-b border-b-default p-4 lg:p-6">
				<div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
					<div class="flex flex-row gap-6">
						{#if playlist.images?.[0]?.url}
							<img
								src={playlist.images[0].url}
								alt={playlist.name}
								class="h-30 w-30 rounded-2xl object-cover shadow-lg md:h-36 md:w-36"
							/>
						{/if}

						<div class="flex flex-col">
							<p class="mb-2 text-xs tracking-wider text-t-secondary uppercase">
								{$translationsStore.profilePage.profilePageUserSelectedPlaylistModalParagraph1}
							</p>

							{#if playlist.name}
								<h2 class="text-3xl leading-tight font-bold text-t-primary md:text-4xl">
									{playlist.name}
								</h2>
							{/if}

							{#if playlist.description}
								<p class="mt-3 text-sm leading-relaxed text-t-secondary">
									{playlist.description}
								</p>
							{/if}

							<div class="mt-4 flex items-center gap-2 text-sm text-t-secondary">
								{#if playlist.owner?.display_name}
									<span class="font-medium">{playlist.owner.display_name}</span>
								{/if}
								<span>•</span>
								{#if playlist.tracks?.total}
									<span
										>{playlist.tracks.total}
										{$translationsStore.profilePage
											.profilePageUserSelectedPlaylistModalMusics}</span
									>
								{/if}
							</div>
						</div>
					</div>

					{#if playlist.external_urls?.spotify}
						<ExternalLink
							externalLink={playlist.external_urls?.spotify}
							externalLinkText={$translationsStore.profilePage
								.profilePageUserSelectedPlaylistModalExternalLink}
							additionalClass="text-xs h-fit w-full mt-0! lg:w-70"
						/>
					{/if}
				</div>
			</div>

			<div class="flex-1 space-y-1 overflow-y-auto p-4 lg:p-6">
				{#if isLoading}
					<p class="mt-10 text-center text-sm text-t-secondary">
						{$translationsStore.profilePage.profilePageUserSelectedPlaylistModalLoadingMusics}
					</p>
				{:else if musicsFromPlaylist.length === 0}
					<p class="mt-10 text-center text-sm text-t-secondary">
						{$translationsStore.profilePage.profilePageUserSelectedPlaylistModalMusicsNotFound}
					</p>
				{:else}
					{#each musicsFromPlaylist as music}
						{#if music.track.external_urls?.spotify}
							<MusicFromPlaylist {music} />
						{/if}
					{/each}
				{/if}
			</div>
		</div>
	</div>
{/if}
