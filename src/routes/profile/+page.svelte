<script lang="ts">
    //Components
    import KeyInformation from "$lib/components/profile/KeyInformation.svelte";

    // Stores
    import { meStore } from "$lib/stores/me.store";
    import { translationsStore } from "$lib/stores/translations.store";
</script>

<svelte:head>
    <title>{$translationsStore.profilePage.title}</title>
</svelte:head>

<section class="px-8 py-8 sm:px-8 sm:py-12 lg:px-12 2xl:px-32 2xl:py-24">
    <KeyInformation userInfo={$meStore} />
</section>