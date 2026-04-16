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

		if (initialInfoFromSpotify) {
			const getUserInfoBySpotify = await getUser(initialInfoFromSpotify);

			if (getUserInfoBySpotify?.success === true) {
				userInfo.set(getUserInfoBySpotify.userInfoFromMongoDB);
			} else {
				const userFromSpotify = await userInfoFromSpotify();

				if (userFromSpotify) {
					const userInfoInitialBuild = {
						email: userFromSpotify.email,
						tickets: 5,
						discoveries: {
							updatedAt: '',
							tracks: [],
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
				} else {
					userInfo.set(undefined);
				}
			}
		} else {
			userInfo.set(undefined);
		}
	} catch (error) {
		userInfo.set(undefined);
	}
}
