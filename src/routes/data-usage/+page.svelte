<script lang="ts">
	// Components
	import DataUsage from '$lib/components/legal-pages/DataUsage.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
</script>

<svelte:head>
	<title>{$translationsStore.legalPages.dataUsage.title}</title>
</svelte:head>

<DataUsage />
