// Stores
import { userInfo } from '$lib/stores/userInfo.store';

// Services
import { userInfoFromSpotify } from './../spotify/fetchUserInfoFromSpotify';
import { initialUserInfoFromSpotify } from '../spotify/initialUserInfoFromSpotify';
import { getUser } from './getUser';
import { createUser } from './createUser';

export async function fetchUserInfo() {
	try {
		const initialInfoFromSpotify = await initialUserInfoFromSpotify();
		if (!initialInfoFromSpotify) return userInfo.set(undefined);

		const getUserInfoFromSpotify = await getUser(initialInfoFromSpotify);
		if (getUserInfoFromSpotify?.success === true) {
			return userInfo.set(getUserInfoFromSpotify.userInfoFromMongoDB);
		}

		const userFromSpotify = await userInfoFromSpotify();
		if (!userFromSpotify) return userInfo.set(undefined);

		const createUserResult = await createUser({
			email: userFromSpotify.email,
			tickets: 5,
			discoveries: { updatedAt: '', tracks: [], artists: [] },
			connectedStreamings: { spotify: userFromSpotify, deezer: undefined }
		});

		userInfo.set(createUserResult.success === true ? createUserResult.createdUser : undefined);
	} catch {
		userInfo.set(undefined);
	}
}
