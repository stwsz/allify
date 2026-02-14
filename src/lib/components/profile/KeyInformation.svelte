<script lang="ts">
	// Components
	import UserTopItems from '$lib/components/profile/UserTopItems.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let userInfo;

	const topItems: ('tracks' | 'artists')[] = ['tracks', 'artists'];
</script>

<div class="flex w-full flex-col gap-12 rounded-xl bg-brand-primary p-8 lg:w-3/12">
	<div class="space-y-6.5">
		<div class="relative mx-auto w-fit">
			<img
				src={userInfo.images[0].url}
				class="h-32 w-32 rounded-full border-4 border-b-default"
				alt={`${$translationsStore.profilePage.profilePageImageAltText} ${userInfo.display_name}`}
				decoding="async"
				fetchpriority="high"
				loading="eager"
			/>

			<span class="absolute right-0 bottom-0">{userInfo.country}</span>
		</div>

		<div class="flex flex-col items-center gap-3.5 text-t-inverse">
			<h2 class="text-2xl font-semibold">{userInfo.display_name}</h2>

			<p class="text-sm font-medium">{userInfo.email}</p>

			<p class="text-xs font-medium">
				{userInfo.followers.total}
				{$translationsStore.profilePage.profilePageFollowers}
			</p>
		</div>
	</div>

	<div class="my-3 h-px w-full rounded-full bg-b-default/50"></div>

	<div class="flex h-full flex-col justify-between">
		{#each topItems as item}
			<UserTopItems topItemType={item} />
		{/each}
	</div>
</div>
