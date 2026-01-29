<script lang="ts">
	// Assets
	import SpotifyIcon from '$lib/assets/images/icons/streamings/SpotifyIcon.svelte';

	export let streamingPlatform: 'spotify' | 'deezer' | null = 'spotify';
	export let externalLink: string | undefined;
	export let externalLinkText: string;
</script>

{#if streamingPlatform === 'spotify'}
	<a
		href={externalLink}
		target="_blank"
		rel="noopener noreferrer"
		class="mt-6 inline-flex items-center justify-center gap-2 rounded-xl
								bg-spotify px-5 py-2.5 text-sm font-semibold text-t-inverse
								shadow-md transition-all duration-200
								hover:scale-[1.02] hover:bg-spotify/90"
	>
		<SpotifyIcon iconSvgClass="w-6.5 h-6.5 text-t-inverse" />

		{externalLinkText}
	</a>
{/if}
