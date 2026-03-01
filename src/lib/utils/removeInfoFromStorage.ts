export function removeInfoFromStorage() {
	sessionStorage.removeItem('most-listened-tracks');
	sessionStorage.removeItem('most-listened-artists');
	sessionStorage.removeItem('user-saved-tracks');
	sessionStorage.removeItem('user-saved-albums');
	sessionStorage.removeItem('user-playlists');
}
