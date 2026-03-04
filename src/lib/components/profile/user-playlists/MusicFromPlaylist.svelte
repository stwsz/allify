<script lang="ts">
	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Utils
	import { formatDuration } from '$lib/utils/formatDuration';

	// Props
	export let music: any;

	let userName = '';

	$: if (music.added_by?.id) {
		idToName(music.added_by.id).then((name) => {
			userName = name;
		});
	}

	async function idToName(userId: string): Promise<string> {
		try {
			const response = await fetch('/api/spotify/user-id-to-name', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ userId })
			});

			if (!response.ok) throw new Error('Failed to fetch user name');

			const data = await response.json();
			return data.display_name || 'Unknown User';
		} catch (error) {
			return 'Unknown User';
		}
	}
</script>

<a
	class="group flex w-full cursor-pointer gap-4 rounded-lg px-4 py-3 text-left transition hover:bg-s-muted"
	href={music.track.external_urls.spotify}
	target="_blank"
	rel="noopener noreferrer"
>
	{#if music.track.album.images?.[2]?.url}
		<img
			src={music.track.album.images[2].url}
			alt={music.track.name}
			class="h-14 w-14 shrink-0 rounded object-cover"
		/>
	{/if}

	<div class="min-w-0 flex-1">
		<div class="flex items-center justify-between gap-4">
			<div class="min-w-0">
				{#if music.track.name}
					<p
						class="truncate text-sm font-medium text-t-primary transition group-hover:text-brand-primary"
					>
						{music.track.name}
					</p>
				{/if}

				{#if music.track.artists}
					<p class="truncate text-xs text-t-secondary">
						{music.track.artists.map((a: { name: string }) => a.name).join(', ')}
					</p>
				{/if}
			</div>

			{#if music.track.duration_ms}
				<span class="shrink-0 text-xs text-t-secondary">
					{formatDuration(music.track.duration_ms)}
				</span>
			{/if}
		</div>

		{#if music.added_by?.id && music.added_at}
			<p class="mt-1 text-[11px] text-t-muted">
				{$translationsStore.profilePage.profilePageUserSelectedPlaylistModalAddedBy}
				{userName} •{' '}
				{new Date(music.added_at).toLocaleDateString()}
			</p>
		{/if}
	</div>
</a>
