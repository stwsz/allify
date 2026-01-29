<script lang="ts">
	// Props
	export let streamingPlatform: 'spotify' | 'deezer' = 'spotify';
	export let animationAltText: string = '';

	const platformColors = {
		spotify: 'bg-spotify',
		deezer: 'bg-deezer'
	};
</script>

<div class="flex gap-2" aria-label={animationAltText} role="img">
	<span
		class="h-2 w-2 {platformColors[streamingPlatform]} animate-bounce rounded-full"
		style="animation-delay: 0ms;"
	></span>
	<span
		class="h-2 w-2 {platformColors[streamingPlatform]} animate-bounce rounded-full"
		style="animation-delay: 150ms;"
	></span>
	<span
		class="h-2 w-2 {platformColors[streamingPlatform]} animate-bounce rounded-full"
		style="animation-delay: 300ms;"
	></span>
</div>

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fadeIn {
		animation: fadeIn 0.3s ease-out;
	}

	.animate-slideUp {
		animation: slideUp 0.4s ease-out;
	}
</style>
