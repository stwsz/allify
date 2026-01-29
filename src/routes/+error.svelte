<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { translationsStore } from '$lib/stores/translations.store';

	const status = $page.status || 500;

	$: title =
		status === 404
			? $translationsStore.errorPage.errorPage404Heading1
			: $translationsStore.errorPage.errorPageOtherErrorsHeading1;

	$: description =
		status === 404
			? $translationsStore.errorPage.errorPage404Paragraph1
			: $translationsStore.errorPage.errorPageOtherErrorsParagraph1;
</script>

<svelte:head>
	<title>
		{status === 404
			? $translationsStore.errorPage.title404
			: $translationsStore.errorPage.titleOtherErrors}
	</title>
</svelte:head>

<section class="px-8 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16 2xl:px-32">
	<div
		class="bg-surface-secondary flex flex-col items-center justify-center gap-12 rounded-lg px-6 py-12 text-center sm:px-8 sm:py-16 lg:px-12 lg:py-20"
	>
		<div class="max-w-lg">
			<h1 class="mb-3 text-2xl font-medium text-t-primary sm:text-3xl lg:text-4xl">
				{title}
			</h1>

			<p class="mt-7 text-base text-t-secondary sm:text-lg">
				{description}
			</p>
		</div>

		<button
			on:click={() => goto('/')}
			class="w-54 cursor-pointer rounded-xl bg-spotify px-6 py-3.5 text-center text-sm font-semibold text-t-inverse shadow-md transition-all duration-200 hover:scale-[1.02]"
		>
			{$translationsStore.errorPage.errorPageButtonGoHome}
		</button>
	</div>
</section>
