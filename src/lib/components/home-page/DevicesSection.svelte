<script lang="ts">
	// Assets
	import DevicesImage from '$lib/assets/images/devices-illustration.webp';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
</script>

<section
	class="flex flex-col-reverse items-center gap-16 bg-s-default px-4 py-12 lg:flex-row lg:justify-between lg:py-32 2xl:px-32"
	id="devices-section"
>
	<img
		src={DevicesImage}
		alt="Devices Illustration"
		fetchpriority="low"
		loading="lazy"
		class="w-115.5 h-auto lg:ml-24"
	/>

	<div class="w-full space-y-6 lg:w-2/5">
		<h2 class="text-center text-4xl text-t-primary lg:text-left lg:text-5xl">
			{$translationsStore.homePage.devicesSectionHeading1}
		</h2>

		<p class="text-md text-center text-t-secondary lg:text-left lg:text-lg">
			{$translationsStore.homePage.devicesSectionParagraph1}
		</p>
	</div>
</section>
