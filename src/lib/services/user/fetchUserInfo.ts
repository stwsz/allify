// Svelte
import { get } from 'svelte/store';

// Stores
import { userInfo } from '$lib/stores/userInfo.store';
import { translationsStore } from '$lib/stores/translations.store';
import { loadingAfterConnectionStore } from '$lib/stores/loadingAfterConnection.store';

// Services
import { userInfoFromSpotify } from './../spotify/fetchUserInfoFromSpotify';
import { initialUserInfoFromSpotify } from '../spotify/initialUserInfoFromSpotify';
import { getUser } from './getUser';
import { createUser } from './createUser';
import { sendEmail } from '../send-email/sendEmail';

// Email templates
import { welcomeToAllifyTemplate } from '$lib/emails/templates/welcomeToAllifyTemaplate';

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
			primaryStreaming: 'spotify',
			discoveries: { updatedAt: undefined, tracks: [], artists: [] },
			connectedStreamings: { spotify: userFromSpotify, deezer: undefined }
		});

		if (createUserResult.success === true) {
			const $translationsStore = get(translationsStore);

			userInfo.set(createUserResult.createdUser);

			sendEmail(
				$translationsStore.templateEmail.welcomeToAllifySubject,
				'igorgabsprofissional@gmail.com',
				welcomeToAllifyTemplate(
					createUserResult.createdUser.connectedStreamings.spotify.name,
					'Spotify'
				)
			);
		} else {
			userInfo.set(undefined);
		}
	} catch {
		userInfo.set(undefined);
	} finally {
		loadingAfterConnectionStore.set({ loading: false, streamingPlatform: null });
	}
}
