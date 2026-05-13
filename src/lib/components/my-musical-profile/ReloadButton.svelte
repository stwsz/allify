<script lang="ts">
	// Assets
	import ReloadIcon from '$lib/assets/images/icons/ReloadIcon.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
</script>

<button
	class="flex cursor-pointer items-center rounded-md bg-brand-primary px-4 py-2 text-xs font-medium text-t-inverse shadow-sm transition-all hover:opacity-90 hover:shadow-md active:scale-[0.98]"
>
	{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedButtonUpdate}

	<ReloadIcon
		iconSvgClass="ml-2 h-4 w-4 text-t-inverse"
		iconAltText={$translationsStore.myMusicalProfilePage
			.myMusicalProfilePageMostListenedReloadIconAltText}
	/>
</button>
