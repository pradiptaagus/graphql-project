export interface CountUserDTO {
	filter: string;
}

export interface UserQueryDTO {
	filter: string;
	page: number;
	size: number;
}

export interface StoreUserDTO {
	name: string;
	username: string;
	password: string;
}

export interface UpdateUserDTO {
	name: string;
	username: string;
}

export interface UpdatePassword {
	password: string;
}
