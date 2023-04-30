import {User} from "../../../models/User";

export type AuthResponse = {
    refreshToken: string,
    token: string,
    user: User,
};

