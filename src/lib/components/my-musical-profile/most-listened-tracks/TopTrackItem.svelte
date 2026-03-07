<script lang="ts">
	// Assets
	import CrownIcon from '$lib/assets/images/icons/CrownIcon.svelte';

	// Components
	import ExternalLink from '../../general/ExternalLinkSpotify.svelte';
	import Popularity from '$lib/components/general/Popularity.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let mostListenedTrackItem: any;
	export let index: number;
</script>

<div class="grid w-full grid-cols-1 gap-8 sm:grid-cols-[auto_1fr_auto]">
	<div class="relative mx-auto shrink-0 sm:mx-0">
		<CrownIcon
			iconSvgClass="absolute -top-3 -left-3 h-8 w-8 -rotate-32 text-yellow-400 sm:h-9 sm:w-9 lg:-top-5 lg:h-10 lg:w-10"
			iconAltText="Crown Icon"
		/>

		<picture>
			<img
				src={mostListenedTrackItem.album.images[1]?.url}
				srcset="
					{mostListenedTrackItem.album.images[2]?.url} 160w,
					{mostListenedTrackItem.album.images[1]?.url} 320w,
					{mostListenedTrackItem.album.images[0]?.url} 640w
				"
				sizes="(max-width: 640px) 160px, (max-width: 1024px) 176px, 192px"
				alt={mostListenedTrackItem.name}
				class="h-40 w-40 rounded-lg object-cover shadow-lg sm:h-44 sm:w-44 lg:h-60 lg:w-60"
				loading="lazy"
			/>
		</picture>
	</div>

	<div class="flex flex-col gap-6">
		<div class="space-y-2">
			<p class="text-3xl font-medium text-t-secondary">
				#{index + 1}
				{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedTracks}
			</p>

			<p class="text-7xl font-semibold text-t-primary">
				{mostListenedTrackItem.name}
			</p>

			<p class="text-t-secondary">
				{mostListenedTrackItem.artists.map((a: any) => a.name).join(', ')}
			</p>
		</div>

		<div class="flex flex-wrap gap-3">
			<span class="rounded-md bg-brand-primary px-4 py-1.5 text-xs font-medium text-t-inverse">
				{mostListenedTrackItem.album.name}
			</span>
		</div>
	</div>

	<div class="flex w-full flex-col gap-4 sm:w-68 sm:items-start">
		<Popularity item={mostListenedTrackItem} />

		<ExternalLink
			additionalClass="w-full mt-2"
			streamingPlatform="spotify"
			externalLink={mostListenedTrackItem.external_urls.spotify}
			externalLinkText={$translationsStore.generalTexts.seeOnSpotify}
		/>
	</div>
</div>
