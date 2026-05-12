import type { UserInfoSpotify } from './SpotifyData.type';

export type UserInfo = {
	email: string;
	tickets: number;
	discoveries: {
		updatedAt: string;
		tracks: string[];
		artists: string[];
	};
	connectedStreamings: {
		spotify?: UserInfoSpotify | undefined;
		deezer?: undefined;
	};
};
