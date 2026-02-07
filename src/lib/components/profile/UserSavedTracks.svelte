<script lang="ts">
    async function getSavedTracks () {
        try {
            const response = await fetch('/api/spotify/saved-tracks');
            if (!response.ok) {
                throw new Error('Failed to fetch saved tracks');
            }
            const data = await response.json();

            return data;
        } catch (error) {
            console.error('Error fetching saved tracks:', error);
        }
    }

    getSavedTracks();
</script>

<h2>Your tracks</h2>
