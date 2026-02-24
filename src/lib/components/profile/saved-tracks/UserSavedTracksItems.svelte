<script lang="ts">
	export let item: any;
</script>

<button
	class="flex w-40 shrink-0 cursor-pointer flex-col items-center gap-2 rounded-lg bg-s-muted/90 p-3 transition-all hover:scale-105 sm:w-44"
>
	<img
		src={item.track.album.images?.[0]?.url}
		alt={item.track.name}
		class="h-36 w-36 rounded-md object-cover"
		loading="lazy"
	/>

	<div class="flex w-full flex-col gap-0.5 text-center">
		<p class="line-clamp-1 text-sm font-semibold text-t-primary">
			{item.track.name}
		</p>

		<p class="line-clamp-1 text-xs text-t-secondary">
			{#each item.track.artists as artist, i}
				<span>{artist.name}{i < item.track.artists.length - 1 ? ', ' : ''}</span>
			{/each}
		</p>

		<p class="line-clamp-1 text-xs text-t-secondary/70">
			{item.track.name}
		</p>
	</div>
</button>
