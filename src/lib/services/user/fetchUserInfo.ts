// Stores
import { userInfo } from '$lib/stores/userInfo.store';

// Services
import { fetchUserInfoFromSpotify } from './../spotify/fetchUserInfoFromSpotify';
import { getUser } from './getUser';
import { createUser } from './createUser';

export async function fetchUserInfo() {
	try {
		const userFromSpotify = await fetchUserInfoFromSpotify();

		if (userFromSpotify) {
			const getUserInfoBySpotify = await getUser(userFromSpotify.email);

			if (getUserInfoBySpotify.success === true) {
				userInfo.set(getUserInfoBySpotify.userInfoFromMongoDB);
			} else {
				const userInfoInitialBuild = {
					email: userFromSpotify.email,
					tickets: 5,
					discoveries: {
						musics: [],
						artists: []
					},
					connectedStreamings: {
						spotify: userFromSpotify,
						deezer: undefined
					}
				};

				const createUserResult = await createUser(userInfoInitialBuild);

				if (createUserResult.success === true) {
					userInfo.set(createUserResult.createdUser);
				} else {
					userInfo.set(undefined);
				}
			}
		} else {
			userInfo.set(undefined);
		}
	} catch (error) {
		console.error('[fetchUserInfo]', error);
		userInfo.set(undefined);
	}
}
