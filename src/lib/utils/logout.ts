import { meStore } from '$lib/stores/me.store';

export async function logout() {
	sessionStorage.clear();

	await fetch('/api/logout', {
		method: 'POST',
		credentials: 'include'
	});

	meStore.set(undefined);
}
