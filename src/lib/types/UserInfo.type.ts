// Types
import type { UserInfoSpotify } from './SpotifyData.type';

export type UserInfo = {
	name: string;
	email: string;
	tickets: number;
	primaryStreaming: 'spotify' | 'deezer';
	discoveries: {
		updatedAt: Date | undefined;
		tracks: string[];
		artists: string[];
	};
	favorites: {
		email: string;
		name: string;
		image: { url: string; height: number | null; width: number | null };
	}[];
	connectedStreamings: {
		spotify: UserInfoSpotify | undefined;
		deezer: undefined;
	};
};

export type SearchUserInfo = {
	email: string;
	name: string;
	image: { url: string; height: number | null; width: number | null };
	spotifyConnected: boolean;
	deezerConnected: boolean;
};
