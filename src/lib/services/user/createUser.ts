// Types
import type { UserInfo } from '$lib/types/UserInfo.type';

export async function createUser(user: UserInfo) {
	const createUserOnMongoDB = await fetch('/api/mongodb/create-user', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ user })
	});

	const resJson = await createUserOnMongoDB.json();

	if (createUserOnMongoDB.ok) {
		return resJson;
	} else {
		console.error(resJson.error || 'Failed to create user');
	}
}
