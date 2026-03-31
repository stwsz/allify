export type UserInfo = {
	email: string;
	tickets: number;
	discoveries: {
		musics: string[];
		artists: string[];
	};
	connectedStreamings: {
		spotify?: UserInfoSpotify | undefined;
		deezer?: undefined;
	};
};

export type UserInfoSpotify = {
	connected: boolean;
	name: string;
	email: string;
	images: { url: string; height: number | null; width: number | null }[];
	country: string;
	followers: number;
	profileLink: string;
	mostListenedArtists:
		| {
				limit: number;
				updatedAt: string;
				mostListenedArtistItem: ArtistSpotify;
				mostListenedArtistsItems: ArtistSpotify[];
		  }
		| undefined;
	mostListenedTracks:
		| {
				limit: number;
				updatedAt: string;
				mostListenedTrackItem: TrackSpotify;
				mostListenedTracksItems: TrackSpotify[];
		  }
		| undefined;
	// likedMusics: [];
	// savedMusics: [];
	// playlists: [];
};

export type ArtistSpotify = {
	id: string;
	name: string;
	popularity: number;
	followers: number;
	genres: string[];
	images: { url: string; height: number | null; width: number | null }[];
	artistLink: string;
};

export type TrackSpotify = {
	id: string;
	name: string;
	artists: string[];
	popularity: number;
	albumName: string;
	images: { url: string; height: number | null; width: number | null }[];
	trackLink: string;
};
