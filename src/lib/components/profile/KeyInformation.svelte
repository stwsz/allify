<script lang="ts">
    // Stores
    import { translationsStore } from "$lib/stores/translations.store";

    // Props
    export let userInfo;
</script>

<div class="bg-brand-primary w-90 flex flex-col gap-4 items-center rounded-xl py-8">
    <div class="relative">
        <img src={userInfo.images[0].url} class="w-32 h-32 rounded-full border-4 border-b-default" alt={`${$translationsStore.profilePage.profilePageImageAltText} ${userInfo.display_name}`} decoding="async" fetchpriority="high" loading="eager">

        <span class="absolute bottom-1 right-1">{userInfo.country}</span>
    </div>
    
    <h1 class="text-xl text-t-inverse font-semibold">{userInfo.display_name}</h1>
</div>