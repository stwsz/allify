<script lang="ts">
    async function getSavedPlaylists () {
        try {
            const response = await fetch('/api/spotify/saved-playlists');
            if (!response.ok) {
                throw new Error('Failed to fetch saved playlists');
            }
            const data = await response.json();

            return data;
        } catch (error) {
            console.error('Error fetching saved playlists:', error);
        }
    }

    getSavedPlaylists();
</script>

<h2>Your playlists</h2>
