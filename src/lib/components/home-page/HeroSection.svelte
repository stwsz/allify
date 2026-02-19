<script lang="ts">
	// Assets
	import AlliFullBodyPointing from '$lib/assets/images/alli/alli-full-body-pointing.webp?enhanced';
	import AlliFullBodyPointingDownwards from '$lib/assets/images/alli/alli-full-body-pointing-downwards.webp?enhanced';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { meStore } from '$lib/stores/me.store';
</script>

<section
	class="flex items-center bg-s-default px-8 py-12 sm:px-12 lg:justify-between lg:py-32 2xl:px-32"
	id="hero-section"
>
	<div class="flex max-w-full flex-col items-center gap-8 lg:mb-14 lg:max-w-190 lg:items-start">
		<h1 class="text-center text-4xl text-t-primary lg:text-left lg:text-5xl">
			{$translationsStore.homePage.homePageHeroSectionHeading1}
		</h1>

		<p class="text-md text-center text-t-secondary lg:text-left lg:text-lg">
			{$translationsStore.homePage.homePageHeroSectionParagraph1}
		</p>

		<enhanced:img
			src={AlliFullBodyPointingDownwards}
			alt={$translationsStore.homePage.alliMascotPointingDownwardsAltText}
			class="h-auto w-56 lg:hidden"
			fetchpriority="high"
			decoding="async"
			width="224"
			height="224"
			sizes="(max-width: 1023px) 224px"
		/>

		<a
			class="mt-6 w-90 max-w-90 cursor-pointer rounded-lg bg-brand-primary py-5 text-center text-sm font-medium text-t-inverse shadow-md transition-all hover:scale-105 hover:bg-brand-primary-dark"
			href={`${$meStore !== undefined ? '/my-musical-profile' : '#connect-platforms'}`}
			aria-label={$meStore !== undefined
				? $translationsStore.homePage.homePageHeroSectionButton1v2AriaLabel
				: $translationsStore.homePage.homePageHeroSectionButton1AriaLabel}
		>
			{$meStore !== undefined
				? $translationsStore.homePage.homePageHeroSectionButton1v2
				: $translationsStore.homePage.homePageHeroSectionButton1}
		</a>
	</div>

	<enhanced:img
		src={AlliFullBodyPointing}
		alt={$translationsStore.homePage.alliMascotPointingToLeftAltText}
		class="mr-2 hidden h-auto w-105 md:mr-5 lg:block 2xl:mr-10"
		fetchpriority="high"
		decoding="async"
		width="380"
		height="380"
		sizes="(min-width: 1536px) 380px, (min-width: 1024px) 380px, 0px"
	/>
</section>
