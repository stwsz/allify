<script lang="ts">
	// Components
	import TermsOfService from '$lib/components/legal-pages/TermsOfService.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
</script>

<svelte:head>
	<title>{$translationsStore.legalPages.termsOfService.title}</title>
</svelte:head>

<TermsOfService />
