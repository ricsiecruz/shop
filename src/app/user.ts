export class User {
    access_token!: string;
    id!: number;
    userId!: number;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    age?: number;
    email?: string;
    phone?: string;
    birthdate?: string;
    image?: string;
}

export class UserInfo {
    access_token!: string;
    id!: number;
    userId!: number;
}