<script lang="ts">
	// Components
	import TopArtistItem from './TopArtistItem.svelte';
	import ExternalLinkSpotify from '../../general/ExternalLinkSpotify.svelte';
	import Popularity from '$lib/components/general/Popularity.svelte';
	import MoreMyMusicalProfileItems from '../MoreMyMusicalProfileItems.svelte';
	import ReloadButton from '../ReloadButton.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';

	$: mostListenedArtists =
		$userInfo?.connectedStreamings.spotify?.mostListenedArtists?.mostListenedArtistsItems;
</script>

<div class="flex flex-col gap-10 lg:gap-14">
	<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
		<h2 class="text-xl font-semibold">
			{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedArtistsHeading2}
		</h2>

		<div class="mt-3 flex items-center justify-between gap-3 md:mt-0">
			{#if $userInfo?.connectedStreamings.spotify?.mostListenedArtists?.updatedAt}
				<span class="flex flex-col gap-2 text-xs whitespace-nowrap text-t-secondary md:flex-row">
					{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedLastUpdate}

					<strong class="font-medium text-t-primary">
						{new Date(
							$userInfo.connectedStreamings.spotify.mostListenedArtists.updatedAt
						).toLocaleString($translationsStore.locale)}
					</strong>
				</span>
			{/if}

			<ReloadButton />
		</div>
	</div>

	<div class="flex flex-col gap-16">
		{#each mostListenedArtists as artist, i (artist.id)}
			{#if i === 0}
				<TopArtistItem
					mostListenedArtistItem={$userInfo?.connectedStreamings.spotify?.mostListenedArtists
						?.mostListenedArtistItem}
					index={i}
				/>
			{:else}
				<div class="grid w-full grid-cols-[auto_1fr] gap-6 sm:grid-cols-[auto_1fr_auto]">
					<img
						src={artist.images[0]?.url}
						alt={artist.name}
						class="h-20 w-20 rounded-lg object-cover shadow-md sm:h-36 sm:w-36 lg:h-42 lg:w-42"
						loading="lazy"
					/>

					<div class="flex min-w-0 flex-col gap-5">
						<div class="space-y-1.5">
							<p class="text-xs font-medium text-t-secondary">
								#{i + 1}
								{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedArtists}
							</p>

							{#if artist.name}
								<p class="text-2xl leading-tight font-semibold text-t-primary">
									{artist.name}
								</p>
							{/if}

							{#if artist.followers}
								<p class="text-xs text-t-secondary">
									{artist.followers.toLocaleString()}
									{$translationsStore.myMusicalProfilePage
										.myMusicalProfilePageMostListenedArtistsFollowers}
								</p>
							{/if}
						</div>

						{#if artist.genres}
							<div class="flex flex-wrap gap-2">
								{#each artist.genres.slice(0, 2) as genre}
									<span
										class="rounded-md bg-brand-primary px-3 py-1 text-[10px] font-medium text-t-inverse"
									>
										{genre}
									</span>
								{/each}
							</div>
						{/if}
					</div>

					<div class="col-span-2 flex w-full flex-col gap-2 sm:col-span-1 sm:items-start md:w-70">
						<Popularity item={artist} />

						<ExternalLinkSpotify
							additionalClass="w-full mt-2"
							streamingPlatform="spotify"
							externalLink={artist.artistLink}
							externalLinkText={$translationsStore.generalTexts.seeOnSpotify}
						/>
					</div>
				</div>
			{/if}
		{/each}

		{#if ($userInfo?.connectedStreamings.spotify?.mostListenedArtists?.limit ?? 0) < 50}
			<MoreMyMusicalProfileItems additionalItemsType="artists" />
		{/if}
	</div>
</div>
