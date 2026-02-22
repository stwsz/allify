<script lang="ts">
	// Components
	import PrivacyPolicy from '$lib/components/legal-pages/PrivacyPolicy.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
</script>

<svelte:head>
	<title>{$translationsStore.legalPages.PrivacyPolicy.title}</title>
</svelte:head>

<PrivacyPolicy />
