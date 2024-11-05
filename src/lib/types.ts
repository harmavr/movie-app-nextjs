export interface LoginUser {
	session_id: string;
}

export interface UserDetails {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	phone: number;
}

export interface UserPreferences {
	movie: { rate: string; movie_id: string }[];
}
