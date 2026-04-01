<script lang="ts">
	// Components
	import TopTrackItem from './TopTrackItem.svelte';
	import ExternalLink from '../../general/ExternalLinkSpotify.svelte';
	import Popularity from '$lib/components/general/Popularity.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { TrackSpotify } from '$lib/types/UserInfo.type';

	let mostListenedTracks: TrackSpotify[] | undefined =
		$userInfo?.connectedStreamings.spotify?.mostListenedTracks?.mostListenedTracksItems;
</script>

<div class="flex flex-col gap-10 lg:gap-14">
	<h2>{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedTracksHeading2}</h2>

	<div class="flex flex-col gap-16">
		{#each mostListenedTracks as track, i (track.id)}
			{#if i === 0}
				<TopTrackItem
					mostListenedTrackItem={$userInfo?.connectedStreamings.spotify?.mostListenedTracks
						?.mostListenedTrackItem}
					index={i}
				/>
			{:else}
				<div class="grid w-full grid-cols-[auto_1fr] gap-6 sm:grid-cols-[auto_1fr_auto]">
					<picture class="shrink-0">
						<img
							src={track.images[1]?.url}
							srcset="
					{track.images[2]?.url} 160w,
					{track.images[1]?.url} 320w,
					{track.images[0]?.url} 640w
				"
							sizes="96px"
							alt={track.name}
							class="h-20 w-20 rounded-lg object-cover shadow-md sm:h-36 sm:w-36 lg:h-42 lg:w-42"
							loading="lazy"
						/>
					</picture>

					<div class="flex min-w-0 flex-col gap-4">
						<div class="space-y-1.5">
							<p class="text-xs font-medium text-t-secondary">
								#{i + 1}
								{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedTracks}
							</p>

							{#if track.name}
								<p class="text-2xl leading-tight font-semibold text-t-primary">
									{track.name}
								</p>
							{/if}

							{#if track.artists}
								<p class="truncate text-xs text-t-secondary">
									{track.artists.join(', ')}
								</p>
							{/if}
						</div>

						{#if track.albumName}
							<div class="flex flex-wrap gap-2">
								<span
									class="rounded-md bg-brand-primary px-3 py-1 text-[10px] font-medium text-t-inverse"
								>
									{track.albumName}
								</span>
							</div>
						{/if}
					</div>

					<div class="col-span-2 flex w-full flex-col gap-2 sm:col-span-1 sm:items-start md:w-70">
						<Popularity item={track} />

						<ExternalLink
							additionalClass="w-full mt-2"
							streamingPlatform="spotify"
							externalLink={track.trackLink}
							externalLinkText={$translationsStore.generalTexts.seeOnSpotify}
						/>
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>
