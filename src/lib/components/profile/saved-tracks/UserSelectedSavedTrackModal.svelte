<script lang="ts">
	// Assets
	import CloseIcon from '$lib/assets/images/icons/CloseIcon.svelte';

	// Components
	import ExternalLink from '$lib/components/general/ExternalLink.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Utils
	import { formatDuration } from '$lib/utils/formatDuration';

	// Props
	export let selectedSavedTrack: any = null;
	export let showSelectedSavedTrackModal: boolean = false;
</script>

{#if showSelectedSavedTrackModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-s-inverse/60 p-4 backdrop-blur-md"
	>
		<div
			class="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-b-default bg-s-default shadow-xl"
		>
			<button
				class="absolute top-5 right-5 z-10 cursor-pointer opacity-70 transition hover:scale-105 hover:opacity-100"
				on:click={() => (showSelectedSavedTrackModal = false)}
				aria-label={$translationsStore.profilePage
					.profilePageUserSelectedSavedTrackCloseButtonAriaLabel +
					' ' +
					selectedSavedTrack.name}
			>
				<CloseIcon
					iconAltText={$translationsStore.profilePage
						.profilePageUserSelectedSavedTrackCloseButtonAriaLabel +
						' ' +
						selectedSavedTrack.name}
					iconSvgClass="w-5 h-5 text-brand-primary"
				/>
			</button>

			<div class="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:gap-8 sm:p-6">
				{#if selectedSavedTrack?.album?.images?.[0]?.url}
					<img
						src={selectedSavedTrack.album.images[0].url}
						alt={selectedSavedTrack.album.name}
						class="h-32 w-32 shrink-0 self-center rounded-xl object-cover shadow-lg sm:h-64 sm:w-64 sm:self-start"
						loading="lazy"
						decoding="async"
						fetchpriority="low"
					/>
				{/if}

				<div class="flex min-w-0 flex-1 flex-col gap-1 sm:gap-2.5">
					<div class="flex items-center gap-2">
						<p class="text-xs font-medium tracking-widest text-t-secondary uppercase">
							{$translationsStore.profilePage.profilePageUserSelectedSavedTrackTrack}
						</p>

						{#if selectedSavedTrack?.explicit !== undefined}
							<span
								class={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
									selectedSavedTrack.explicit
										? 'bg-status-error/10 text-status-error'
										: 'bg-status-success/10 text-status-success'
								}`}
							>
								{selectedSavedTrack.explicit
									? $translationsStore.profilePage.profilePageUserSelectedSavedTrackExplicit
									: $translationsStore.profilePage.profilePageUserSelectedSavedTrackClean}
							</span>
						{/if}
					</div>

					<div class="flex flex-col gap-1">
						{#if selectedSavedTrack?.name}
							<p class="truncate text-xl font-bold text-t-primary sm:text-3xl">
								{selectedSavedTrack.name}
							</p>
						{/if}

						{#if selectedSavedTrack?.artists?.length}
							<p class="truncate text-sm text-t-secondary">
								{selectedSavedTrack.artists.map((a: any) => a.name).join(', ')}
							</p>
						{/if}
					</div>

					<div class="flex flex-col gap-2">
						{#if selectedSavedTrack?.album?.name}
							<span
								class="w-fit rounded-md bg-brand-primary px-3 py-1 text-[11px] font-medium text-t-inverse"
							>
								{selectedSavedTrack.album.name}
							</span>
						{/if}

						<div class="flex items-center gap-2 text-xs text-t-secondary">
							{#if selectedSavedTrack?.album?.release_date}
								<span>{selectedSavedTrack.album.release_date.slice(0, 4)}</span>
							{/if}

							{#if selectedSavedTrack?.album?.release_date && selectedSavedTrack?.duration_ms}
								<span>•</span>
							{/if}

							{#if selectedSavedTrack?.duration_ms}
								<span>{formatDuration(selectedSavedTrack.duration_ms)}</span>
							{/if}
						</div>
					</div>

					<div class="flex flex-col gap-2 pt-1 sm:w-90">
						{#if selectedSavedTrack?.popularity !== undefined}
							<div class="flex w-full items-center gap-4">
								<span class="w-20 shrink-0 text-xs text-t-secondary"
									>{$translationsStore.profilePage
										.profilePageUserSelectedSavedTrackPopularity}</span
								>
								<div class="h-1.5 flex-1 overflow-hidden rounded-full bg-s-muted">
									<div
										class="h-full bg-brand-primary transition-all"
										style="width: {selectedSavedTrack.popularity}%"
									></div>
								</div>
								<span class="w-8 shrink-0 text-right text-xs font-semibold text-t-primary">
									{selectedSavedTrack.popularity}%
								</span>
							</div>
						{/if}

						{#if selectedSavedTrack?.external_urls?.spotify}
							<ExternalLink
								externalLink={selectedSavedTrack.external_urls.spotify}
								externalLinkText={$translationsStore.profilePage
									.profilePageUserSelectedSavedTrackOpenOnSpotify}
								additionalClass="text-xs h-fit mt-2! w-full! sm:w-fit"
							/>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
