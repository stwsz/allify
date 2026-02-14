<script lang="ts">
	// Svelte
	import { onMount } from 'svelte';

	// Components
	import TopTrackItem from './TopTrackItem.svelte';
	import ExternalLink from '../../general/ExternalLink.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	let mostListenedTracks: any[] = [];

	async function fetchMostListenedTracksItems() {
		try {
			const reqMostListenedItems = await fetch(`/api/spotify/most-listened-tracks`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ locale: $translationsStore.locale })
			});

			if (!reqMostListenedItems.ok) {
				return;
			}

			const resMostListenedItems = await reqMostListenedItems.json();
			mostListenedTracks = resMostListenedItems;

			sessionStorage.setItem(`most-listened-tracks`, JSON.stringify(mostListenedTracks));
		} catch (error) {
			console.error('Error fetching most listened tracks:', error);
		}
	}

	onMount(() => {
		const cachedMostListenedTracks = sessionStorage.getItem(`most-listened-tracks`);

		if (cachedMostListenedTracks) {
			mostListenedTracks = JSON.parse(cachedMostListenedTracks);
		} else {
			fetchMostListenedTracksItems();
		}
	});

	console.log('mostListenedTracks', mostListenedTracks);
</script>

<div class="flex flex-col gap-10 lg:gap-14">
	<h2>{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedTracksHeading2}</h2>

	<div class="flex flex-col gap-16">
		{#each mostListenedTracks as track, i (track.id)}
			{#if i === 0}
				<TopTrackItem mostListenedTrackItem={track} index={i} />
			{:else}
				<div class="grid w-full grid-cols-[auto_1fr] gap-6 sm:grid-cols-[auto_1fr_auto]">
					<picture class="shrink-0">
						<img
							src={track.album.images[1]?.url}
							srcset="
				{track.album.images[2]?.url} 160w,
				{track.album.images[1]?.url} 320w,
				{track.album.images[0]?.url} 640w
			"
							sizes="96px"
							alt={track.name}
							class="h-20 w-20 rounded-lg object-cover shadow-md sm:h-36 sm:w-36 lg:h-42 lg:w-42"
							loading="lazy"
						/>
					</picture>

					<div class="flex min-w-0 flex-col gap-5">
						<div class="space-y-2">
							<p class="text-sm font-medium text-t-secondary">
								#{i + 1}
								{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedTracks}
							</p>

							<p class="text-t-primary9 truncate text-3xl font-semibold">
								{track.name}
							</p>

							<p class="truncate text-sm text-t-secondary">
								{track.artists.map((a: any) => a.name).join(', ')}
							</p>
						</div>

						<div class="flex flex-wrap gap-2">
							<span
								class="rounded-md bg-brand-primary px-3 py-1 text-[11px] font-medium text-t-inverse"
							>
								{track.album.name}
							</span>
						</div>
					</div>

					<div class="col-span-2 flex flex-col gap-2 sm:col-span-1 sm:items-start">
						<div class="flex items-center gap-1.5">
							<span class="text-xs text-t-secondary">
								{$translationsStore.myMusicalProfilePage
									.myMusicalProfilePageMostListenedTracksPopularity}
							</span>

							<div class="h-1.5 w-20 overflow-hidden rounded-full bg-s-muted">
								<div class="h-full bg-brand-primary" style="width: {track?.popularity || 0}%"></div>
							</div>

							<span class="text-xs font-medium text-t-primary">
								{track?.popularity}%
							</span>
						</div>

						<ExternalLink
							additionalClass="w-full"
							streamingPlatform="spotify"
							externalLink={track.external_urls.spotify}
							externalLinkText={$translationsStore.generalTexts.seeOnSpotify}
						/>
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>
