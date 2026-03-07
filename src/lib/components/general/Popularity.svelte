<script lang="ts">
    // Stores
    import { translationsStore } from '$lib/stores/translations.store';

    // Props
	export let item: any;
</script>

<div class="flex items-center w-full justify-between">
	<span class="text-xs text-t-secondary w-fit">
		{$translationsStore.generalTexts.popularity}
	</span>

	<div class="h-1.5 overflow-hidden rounded-full w-7/12 bg-s-muted">
		<div class="h-full bg-brand-primary" style="width: {item?.popularity || 0}%"></div>
	</div>

	<span class="text-xs font-medium text-t-primary w-fit">
		{item?.popularity}%
	</span>
</div>
