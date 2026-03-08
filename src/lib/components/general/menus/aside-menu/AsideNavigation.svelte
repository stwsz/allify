<script lang="ts">
	// Svelte
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let isAsideMenuOpen: boolean;

	$: navItems = [
		{
			name: $translationsStore.generalTexts.headerNavigationItem1,
			link: '/my-musical-profile'
		},
		{
			name: $translationsStore.generalTexts.headerNavigationItem2,
			link: '/discoveries'
		},
		{
			name: $translationsStore.generalTexts.headerNavigationItem3,
			link: '/music-battles'
		}
	];
</script>

<nav aria-label={$translationsStore.generalTexts.headerNavigationAriaLabel}>
	<ul class="flex flex-col gap-8 px-8 py-12">
		{#each navItems as item}
			<li class="overflow-y-hidden">
				<button
					on:click={() => {
						goto(item.link);

						isAsideMenuOpen = false;
					}}
					aria-current={$page.url.pathname === item.link ? 'page' : undefined}
					class="
						relative
						text-sm
						font-medium
						transition-colors
						duration-200
						ease-out
						after:absolute
						after:-bottom-1
						after:left-0
						after:h-0.5
						after:w-0
						after:rounded-full
						after:bg-brand-primary-dark
						after:transition-all
						after:duration-300
						after:ease-out
						hover:text-brand-primary-dark
						hover:after:w-full
						cursor-pointer
						{$page.url.pathname === item.link
						? 'font-semibold text-brand-primary-dark after:w-full'
						: 'text-brand-primary'}
					"
				>
					{item.name}
				</button>
			</li>
		{/each}
	</ul>
</nav>
