<script lang="ts">
    async function getSavedAlbums () {
        try {
            const response = await fetch('/api/spotify/saved-albums');
            if (!response.ok) {
                throw new Error('Failed to fetch saved albums');
            }
            const data = await response.json();

            return data;
        } catch (error) {
            console.error('Error fetching saved albums:', error);
        }
    }

    getSavedAlbums();
</script>

<h2>Your saved albums</h2>

