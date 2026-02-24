<script lang="ts">
	// Components
	import ExternalLink from '$lib/components/general/ExternalLink.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let userInfo;
</script>

<div
	class="flex w-full flex-col items-center justify-between gap-8
	md:flex-row lg:items-center lg:gap-0"
>
	<div
		class="flex flex-col items-center gap-6 text-center
		sm:flex-row sm:text-left lg:gap-12"
	>
		<div class="relative w-fit">
			<img
				src={userInfo.images[0].url}
				class="h-24 w-24 rounded-full border-4 border-brand-primary object-cover
				sm:h-32 sm:w-32 lg:h-42 lg:w-42"
				alt={`${$translationsStore.profilePage.profilePageImageAltText} ${userInfo.display_name}`}
				decoding="async"
				fetchpriority="high"
				loading="eager"
			/>

			<span
				class="absolute right-0.5 bottom-0.5 rounded-full bg-brand-primary px-2 py-0.5 text-xs font-semibold text-white"
			>
				{userInfo.country}
			</span>
		</div>

		<div class="flex flex-col justify-center gap-2 text-t-primary">
			<h1 class="mb-1.5! text-2xl font-semibold sm:text-3xl">
				{userInfo.display_name}
			</h1>

			<p class="text-sm font-medium break-all lg:text-base">
				{userInfo.email}
			</p>

			<p class="text-xs font-medium sm:text-sm">
				{userInfo.followers.total}
				{$translationsStore.profilePage.profilePageFollowers}
			</p>
		</div>
	</div>

	<ExternalLink
		streamingPlatform="spotify"
		externalLink={userInfo.external_urls.spotify}
		externalLinkText={$translationsStore.profilePage.profilePageExternalLinkSpotify}
		additionalClass="h-fit w-full sm:w-fit"
	/>
</div>
