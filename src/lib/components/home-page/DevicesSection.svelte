<script lang="ts">
	// Assets
	import DevicesImage from '$lib/assets/images/devices-illustration.webp?enhanced';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
</script>

<section
	class="flex flex-col-reverse items-center gap-16 bg-s-default px-4 py-12 lg:flex-row lg:justify-between lg:py-32 2xl:px-32"
	id="devices-section"
>
	<enhanced:img
		src={DevicesImage}
		alt={$translationsStore.homePage.devicesSectionAltText}
		loading="lazy"
		fetchpriority="low"
		decoding="async"
		width="460"
		height="460"
		class="h-auto w-[320px] lg:ml-20 lg:w-120"
		sizes="(min-width: 1536px) 460px, (min-width: 1024px) 460px, (min-width: 640px) 400px, 320px"
	/>

	<div class="w-full space-y-6 lg:w-2/5">
		<h2 class="text-center text-4xl text-t-primary lg:w-120 lg:min-w-120 lg:text-left lg:text-5xl">
			{$translationsStore.homePage.devicesSectionHeading1}
		</h2>

		<p class="text-md text-center text-t-secondary lg:text-left lg:text-lg">
			{$translationsStore.homePage.devicesSectionParagraph1}
		</p>
	</div>
</section>
