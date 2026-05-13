<script lang="ts">
	// Assets
	import ReloadIcon from '$lib/assets/images/icons/ReloadIcon.svelte';
	import ShareIcon from '$lib/assets/images/icons/ShareIcon.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let lastSync: Date | undefined;
</script>

<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
	<span class="flex flex-col gap-1 text-xs text-t-secondary sm:gap-2 md:flex-row">
		{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedLastUpdate}

		<strong class="font-medium text-t-primary">
			{lastSync ? new Date(lastSync).toLocaleString($translationsStore.locale) : '-'}
		</strong>
	</span>

	<div class="flex gap-2">
		<button
			class="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md bg-brand-primary px-4 py-2 text-xs font-medium text-t-inverse shadow-sm transition-all hover:opacity-90 hover:shadow-md sm:flex-none"
		>
			<ReloadIcon
				iconSvgClass="h-4 w-4 text-t-inverse"
				iconAltText={$translationsStore.myMusicalProfilePage
					.myMusicalProfilePageMostListenedReloadIconAltText}
			/>

			{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedButtonUpdate}
		</button>

		<button
			class="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md bg-brand-primary px-4 py-2 text-xs font-medium text-t-inverse shadow-sm transition-all hover:opacity-90 hover:shadow-md sm:flex-none"
		>
			<ShareIcon
				iconSvgClass="h-4 w-4 text-t-inverse"
				iconAltText={$translationsStore.myMusicalProfilePage
					.myMusicalProfilePageMostListenedShareIconAltText}
			/>

			{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedShareButton}
		</button>
	</div>
</div>
