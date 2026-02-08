<script lang="ts">
	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let userInfo;
</script>

<div class="flex w-3/12 flex-col items-center gap-4 rounded-xl bg-brand-primary py-8">
	<div class="relative">
		<img
			src={userInfo.images[0].url}
			class="h-32 w-32 rounded-full border-4 border-b-default"
			alt={`${$translationsStore.profilePage.profilePageImageAltText} ${userInfo.display_name}`}
			decoding="async"
			fetchpriority="high"
			loading="eager"
		/>

		<span class="absolute right-1 bottom-1">{userInfo.country}</span>
	</div>

	<div class="flex flex-col items-center gap-3 text-t-inverse">
		<h2 class="text-2xl font-semibold">{userInfo.display_name}</h2>

		<p class="text-sm font-medium">{userInfo.email}</p>

		<p class="text-xs font-medium">
			{userInfo.followers.total}
			{$translationsStore.profilePage.profilePageFollowers}
		</p>
	</div>
</div>
