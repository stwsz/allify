<script lang="ts">
	// Components
	import ReloadButton from './ReloadButton.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let lastSync: Date | undefined;
</script>

{#if lastSync}
	<div class="mt-3 flex items-center justify-between gap-3 md:mt-0">
		<span class="flex flex-col gap-2 text-xs whitespace-nowrap text-t-secondary md:flex-row">
			{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedLastUpdate}

			<strong class="font-medium text-t-primary">
				{new Date(lastSync).toLocaleString($translationsStore.locale)}
			</strong>
		</span>

		<ReloadButton />
	</div>
{/if}
