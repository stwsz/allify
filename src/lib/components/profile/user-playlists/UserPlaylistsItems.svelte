<script lang="ts">
	export let item: any;
</script>

<button
	class="flex w-40 shrink-0 cursor-pointer flex-col items-center gap-2 rounded-lg bg-s-muted/90 p-3 transition-all hover:scale-105 sm:w-44"
>
	<img
		src={item.images?.[0]?.url}
		alt={item.name}
		class="h-36 w-36 rounded-md object-cover"
		loading="lazy"
	/>

	<div class="flex w-full flex-col gap-0.5 text-center">
		<p class="line-clamp-1 text-sm font-semibold text-t-primary">
			{item.name}
		</p>

		{#if item.owner}
			<p class="line-clamp-1 text-xs text-t-secondary">
				Por {item.owner.display_name}
			</p>
		{/if}

		{#if item.tracks}
			<p class="text-xs text-t-secondary/70">
				{item.tracks.total} músicas
			</p>
		{/if}
	</div>
</button>
