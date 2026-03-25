<script lang="ts">
	// Assets
	import AlliFullBodyWaving from '$lib/assets/images/alli/alli-full-body-waving.webp?enhanced';
	import DotsLoading from '$lib/assets/images/animations/DotsLoading.svelte';

	// Components
	import NotLogged from '$lib/components/general/NotLogged.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { meStore } from '$lib/stores/me.store';

	let loading = false;

	$: mostListenedArtists = [] as string[];
	$: mostListenedTracks = [] as string[];

	async function ClaudeCallToGetDiscoveries() {
		loading = true;

		let mostListenedArtistsCall = [] as string[];
		let mostListenedTracksCall = [] as string[];

		const mostListenedArtistsFromStorage = sessionStorage.getItem('spotify-most-listened-artists');
		const mostListenedTracksFromStorage = sessionStorage.getItem('spotify-most-listened-tracks');

		if (mostListenedArtistsFromStorage && mostListenedTracksFromStorage) {
			let mostListenedArtistsParsed = JSON.parse(mostListenedArtistsFromStorage);
			let mostListenedTracksParsed = JSON.parse(mostListenedTracksFromStorage);

			for (const artist of mostListenedArtistsParsed) {
				mostListenedArtistsCall.push(artist.name);
			}

			for (const track of mostListenedTracksParsed) {
				mostListenedTracksCall.push(track.name);
			}
		} else {
			return;
		}

		const discoveriesReq = await fetch('/api/calls-claude/discoveries', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				mostListenedTracks: mostListenedTracksCall,
				mostListenedArtists: mostListenedTracksCall
			})
		});

		const discoveriesRes = await discoveriesReq.json();
		const { songs, artists } = discoveriesRes;

		mostListenedArtists = artists;
		mostListenedTracks = songs;

		loading = false;
	}
</script>

<svelte:head>
	<title>{$translationsStore.discoveriesPage.title}</title>
</svelte:head>

{#if $meStore !== undefined}
	<section class="base-section px-4 py-10 md:px-6 md:py-14">
		<h1 class="text-center text-2xl font-semibold text-t-primary md:text-left md:text-3xl">
			{$translationsStore.discoveriesPage.discoveriesPageHeading1}
		</h1>

		<div class="flex flex-col-reverse justify-between gap-10 lg:flex-row">
			<div class="flex w-full flex-col gap-5 lg:w-3/5">
				<p
					class="text-center text-sm leading-relaxed text-t-secondary md:text-left md:text-base"
				>
					{$translationsStore.discoveriesPage.discoveriesPageParagraph1}
				</p>

				<div
					class="mt-2 flex min-h-45 flex-col gap-6 rounded-xl border border-b-default bg-s-default px-8 py-6 shadow-sm sm:flex-row"
				>
					{#if loading === true}
						<div class="flex w-full items-center justify-center text-center">
							<DotsLoading />
						</div>
					{:else if mostListenedArtists.length !== 0 && mostListenedTracks.length !== 0}
						<div class="flex-1">
							<h2 class="mb-3 text-sm font-medium text-t-primary">{$translationsStore.discoveriesPage.discoveriesPageHeading2Artists}</h2>

							<ul class="space-y-3 text-xs text-t-secondary">
								{#each mostListenedArtists as artist}
									<li class="truncate transition-colors hover:text-t-primary">
										{artist}
									</li>
								{/each}
							</ul>
						</div>

						<div class="hidden w-px bg-b-default sm:block"></div>

						<div class="flex-1">
							<h2 class="mb-3 text-sm font-medium text-t-primary">{$translationsStore.discoveriesPage.discoveriesPageHeading2Tracks}</h2>

							<ul class="space-y-3 text-xs text-t-secondary">
								{#each mostListenedTracks as track}
									<li class="truncate transition-colors hover:text-t-primary">
										{track}
									</li>
								{/each}
							</ul>
						</div>
					{:else}
						<div class="flex w-full items-center justify-center text-center text-sm text-t-muted">
							{$translationsStore.discoveriesPage.discoveriesPageDiscoverNow}
						</div>
					{/if}
				</div>

				<button
					class="mx-auto mt-4 w-full cursor-pointer rounded-lg bg-brand-primary px-8 py-4 text-sm font-medium text-t-inverse shadow-sm transition-all hover:bg-brand-primary-dark hover:shadow-md active:scale-95 sm:w-fit"
					onclick={ClaudeCallToGetDiscoveries}
				>
					{$translationsStore.discoveriesPage.discoveriesPageDiscoverNowButton}
				</button>
			</div>

			<enhanced:img
				src={AlliFullBodyWaving}
				alt={$translationsStore.discoveriesPage.alliMascotWavingAltText}
				class="h-auto w-44 mx-auto mt-5 sm:w-60 md:w-72 lg:w-85 xl:w-95"
				width="380"
				height="380"
				loading="eager"
				fetchpriority="high"
				decoding="sync"
				sizes="(min-width: 1280px) 380px, (min-width: 1024px) 320px, (min-width: 768px) 260px, 180px"
			/>
		</div>
	</section>
{:else}
	<NotLogged notLoggedParagraph={$translationsStore.generalTexts.notLoggedDiscoveriesParagraph1} />
{/if}
