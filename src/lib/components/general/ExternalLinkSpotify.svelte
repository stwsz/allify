<script lang="ts">
	// Assets
	import SpotifyIcon from '$lib/assets/images/icons/streamings/SpotifyIcon.svelte';

	// Props
	export let streamingPlatform: 'spotify' | 'deezer' | null = 'spotify';
	export let externalLink: string | undefined;
	export let externalLinkText: string;
	export let additionalClass = '';
</script>

{#if streamingPlatform === 'spotify'}
	<a
		href={externalLink}
		target="_blank"
		rel="noopener noreferrer"
		class="inline-flex items-center justify-center gap-3 rounded-xl
								bg-spotify px-5 py-2.5 text-xs font-medium text-t-inverse
								shadow-md transition-all duration-200
								hover:scale-[1.02] hover:bg-spotify/90 {additionalClass}"
	>
		<SpotifyIcon iconSvgClass="w-5.5 h-5.5 text-t-inverse" />

		{externalLinkText}
	</a>
{/if}
