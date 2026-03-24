<script lang="ts">
	// Assets
	import CloseIcon from '$lib/assets/images/icons/CloseIcon.svelte';

	// Components
	import ExternalLink from '$lib/components/general/ExternalLinkSpotify.svelte';
	import MusicFromPlaylist from './MusicFromPlaylist.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let playlist: any;
	export let showSelectedPlaylistModal: boolean;

	let musicsFromPlaylist: any[] = [];
	let isLoading = true;

	function getStorageKey() {
		return `spotify-musics-from-playlist-${playlist.id}`;
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

			<div class="border-b border-b-default p-5 lg:p-6">
				<div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
					{#if playlist.images?.[0]?.url}
						<img
							src={playlist.images[0].url}
							alt={playlist.name}
							class="h-32 w-32 shrink-0 self-center rounded-xl object-cover shadow-lg sm:self-start lg:h-52 lg:w-52"
							loading="lazy"
							decoding="async"
							fetchpriority="low"
						/>
					{/if}

					<div class="flex min-w-0 flex-1 flex-col gap-3">
						<div class="flex items-center gap-2">
							<p class="text-xs font-medium tracking-widest text-t-secondary uppercase">
								{$translationsStore.profilePage.profilePageUserSelectedPlaylistModalParagraph1}
							</p>

							{#if playlist.public !== undefined}
								<span
									class="inline-flex shrink-0 items-center rounded bg-s-muted px-1.5 py-0.5 text-[10px] font-semibold text-t-muted lowercase"
								>
									{playlist.public
										? $translationsStore.profilePage.profilePageUserSelectedPlaylistModalPublic
										: $translationsStore.profilePage.profilePageUserSelectedPlaylistModalPrivate}
								</span>
							{/if}
						</div>

						<div class="flex flex-col gap-1">
							{#if playlist.name}
								<p class="text-xl font-bold text-t-primary sm:text-2xl">
									{playlist.name}
								</p>
							{/if}

							{#if playlist.description}
								<p class="text-sm text-t-secondary">
									{playlist.description}
								</p>
							{/if}
						</div>

						<div class="flex flex-col gap-2">
							<div class="flex items-center gap-2 text-xs text-t-secondary">
								{#if playlist.owner?.display_name}
									<span
										class="w-fit rounded-md bg-brand-primary px-3 py-1 text-[11px] font-medium text-t-inverse"
									>
										{playlist.owner.display_name}
									</span>
								{/if}

								{#if playlist.tracks?.total}
									<span>•</span>
									<span
										>{playlist.tracks.total}
										{playlist.tracks.total === 1
											? $translationsStore.profilePage.profilePageUserSelectedPlaylistModalMusics.slice(
													0,
													-1
												)
											: $translationsStore.profilePage
													.profilePageUserSelectedPlaylistModalMusics}</span
									>
								{/if}
							</div>
						</div>

						{#if playlist.external_urls?.spotify}
							<ExternalLink
								externalLink={playlist.external_urls.spotify}
								externalLinkText={$translationsStore.profilePage
									.profilePageUserSelectedPlaylistModalExternalLink}
								additionalClass="w-full mt-2 sm:w-70"
							/>
						{/if}
					</div>
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
