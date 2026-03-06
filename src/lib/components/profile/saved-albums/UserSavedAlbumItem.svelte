<script lang="ts">
	// Props
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let item: any;
	export let selectedSavedAlbum: any = null;
	export let showSelectedSavedAlbumModal: boolean = false;
</script>

<button
	class="flex w-40 shrink-0 cursor-pointer flex-col items-center gap-2 rounded-lg bg-s-muted/90 p-3 transition-all hover:scale-105 sm:w-44"
	onclick={() => {
		selectedSavedAlbum = item.album;
		showSelectedSavedAlbumModal = true;
	}}
>
	<img
		src={item.album.images?.[0]?.url}
		alt={item.album.name}
		class="h-36 w-36 rounded-md object-cover"
		loading="lazy"
		decoding="async"
		fetchpriority="low"
	/>

	<div class="flex w-full flex-col gap-0.5 text-center">
		<p class="line-clamp-1 text-sm font-semibold text-t-primary">
			{item.album.name}
		</p>

		<p class="line-clamp-1 text-xs text-t-secondary">
			{#each item.album.artists as artist, i}
				<span>
					{artist.name}{i < item.album.artists.length - 1 ? ', ' : ''}
				</span>
			{/each}
		</p>

		<p class="text-xs text-t-secondary/70">
			{item.album.total_tracks}
			{$translationsStore.profilePage.profilePageUserAlbumItemTracks}
		</p>
	</div>
</button>
