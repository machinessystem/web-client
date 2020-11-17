export class AppUser {
    roles?: Roles;
    email: string;
    uid: string;
    agreement: boolean;
    photoURL?: string;
    displayName?: string;
}

export interface UserInfo {
    uid: string;
    roles?: Roles;
    agreement: boolean;
}
export interface Roles {
    member?: boolean;
    admin?: boolean;
}