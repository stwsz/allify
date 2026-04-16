export async function initialUserInfoFromSpotify() {
	try {
		const response = await fetch('/api/spotify/me', {
			credentials: 'include'
		});

		const data = await response.json();

		return data.email;
	} catch {
		return undefined;
	}
}
