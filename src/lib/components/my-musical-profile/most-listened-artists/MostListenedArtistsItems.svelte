<script lang="ts">
	// Svelte
	import { onMount } from 'svelte';

	// Components
	import TopArtistItem from './TopArtistItem.svelte';
	import ExternalLink from '../../general/ExternalLink.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	let mostListenedArtists: any[] = [];

	async function fetchMostListenedArtistsItems() {
		try {
			const reqMostListenedItems = await fetch(`/api/spotify/most-listened-artists`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ locale: $translationsStore.locale })
			});

			if (!reqMostListenedItems.ok) {
				return;
			}

			const resMostListenedItems = await reqMostListenedItems.json();
			mostListenedArtists = resMostListenedItems;

			sessionStorage.setItem(`most-listened-artists`, JSON.stringify(mostListenedArtists));
		} catch (error) {
			console.error('Error fetching most listened artists:', error);
		}
	}

	onMount(() => {
		const cachedMostListenedArtists = sessionStorage.getItem(`most-listened-artists`);

		if (cachedMostListenedArtists) {
			mostListenedArtists = JSON.parse(cachedMostListenedArtists);
		} else {
			fetchMostListenedArtistsItems();
		}
	});
</script>

<div class="flex flex-col gap-10 lg:gap-14">
	<h2>
		{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedArtistsHeading2}
	</h2>

	<div class="flex flex-col gap-16">
		{#each mostListenedArtists as artist, i (artist.id)}
			{#if i === 0}
				<TopArtistItem mostListenedArtistItem={artist} index={i} />
			{:else}
				<div class="grid w-full grid-cols-[auto_1fr] gap-6 sm:grid-cols-[auto_1fr_auto]">
					<picture class="shrink-0">
						<img
							src={artist.images[1]?.url}
							srcset="
				{artist.images[2]?.url} 160w,
				{artist.images[1]?.url} 320w,
				{artist.images[0]?.url} 640w
			"
							sizes="96px"
							alt={artist.name}
							class="h-20 w-20 rounded-lg object-cover shadow-md sm:h-36 sm:w-36 lg:h-42 lg:w-42"
							loading="lazy"
						/>
					</picture>

					<div class="flex min-w-0 flex-col gap-5">
						<div class="space-y-2">
							<p class="text-sm font-medium text-t-secondary">
								#{i + 1}
								{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedArtists}
							</p>

							<p class="text-t-primary9 truncate text-3xl font-semibold">
								{artist.name}
							</p>

							<p class="text-sm text-t-secondary">
								{artist.followers.total.toLocaleString()}
								{$translationsStore.myMusicalProfilePage
									.myMusicalProfilePageMostListenedArtistsFollowers}
							</p>
						</div>

						<div class="flex flex-wrap gap-2">
							{#each artist.genres.slice(0, 2) as genre}
								<span
									class="rounded-md bg-brand-primary px-3 py-1 text-[11px] font-medium text-t-inverse"
								>
									{genre}
								</span>
							{/each}
						</div>
					</div>

					<div class="col-span-2 flex flex-col gap-2 sm:col-span-1 sm:items-start">
						<div class="flex items-center gap-1.5">
							<span class="text-xs text-t-secondary">
								{$translationsStore.myMusicalProfilePage
									.myMusicalProfilePageMostListenedArtistsPopularity}
							</span>

							<div class="h-1.5 w-20 overflow-hidden rounded-full bg-s-muted">
								<div
									class="h-full bg-brand-primary"
									style="width: {artist?.popularity || 0}%"
								></div>
							</div>

							<span class="text-xs font-medium text-t-primary">
								{artist?.popularity}%
							</span>
						</div>

						<ExternalLink
							additionalClass="w-full"
							streamingPlatform="spotify"
							externalLink={artist.external_urls.spotify}
							externalLinkText={$translationsStore.generalTexts.seeOnSpotify}
						/>
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>
