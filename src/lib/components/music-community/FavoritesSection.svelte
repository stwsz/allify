<script lang="ts">
	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let favorites;
</script>

<div class="w-full rounded-xl border border-b-default bg-s-default p-5 xl:w-2/5">
	<div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h2 class="text-xl font-semibold text-t-primary">
				{$translationsStore.musicCommunityPage.musicCommunityFavoritesSectionHeading2}
			</h2>

			<p class="mt-1 text-sm text-t-secondary">
				{$translationsStore.musicCommunityPage.musicCommunityFavoritesSectionParagraph1}
			</p>
		</div>

		<span
			class="w-fit rounded-full bg-brand-primary/10 px-3 py-1 text-sm font-semibold text-brand-primary"
		>
			{#if favorites}
				{favorites.length}
			{:else}
				0
			{/if}
		</span>
	</div>

	<div
		class={`flex h-64 max-h-64 flex-col gap-4 ${favorites && favorites.length > 0 ? 'overflow-auto' : 'overflow-hidden'}`}
	>
		{#if favorites && favorites.length > 0}
			{#each favorites as favorite}
				<div
					class="flex items-center gap-4 rounded-xl border border-b-default bg-s-muted p-3 transition hover:border-brand-primary"
				>
					<img
						src={favorite.userImage}
						alt={`${$translationsStore.musicCommunityPage.musicCommunityFavoritesSectionUserImageAltText} ${favorite.name}`}
						class="h-14 w-14 shrink-0 rounded-lg object-cover sm:h-16 sm:w-16"
					/>

					<h3 class="min-w-0 truncate font-semibold text-t-primary">
						{favorite.name}
					</h3>
				</div>
			{/each}
		{:else}
			<div
				class="flex h-full w-full flex-col items-center justify-center rounded-xl border border-dashed border-b-default bg-s-muted px-6 text-center"
			>
				<p class="font-medium text-t-primary">
					{$translationsStore.musicCommunityPage.musicCommunityFavoritesSectionEmptyParagraph1}
				</p>

				<p class="mt-2 text-sm text-t-secondary">
					{$translationsStore.musicCommunityPage.musicCommunityFavoritesSectionEmptyParagraph2}
				</p>
			</div>
		{/if}
	</div>
</div>
