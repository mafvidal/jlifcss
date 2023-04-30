import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../../models/User";

export enum AuthStatus {
    NOT_AUTHENTICATED = "not-authenticated",
    AUTHENTICATED = "authenticated",
    CHECKING = "checking"
}

type AuthState = {
    status: AuthStatus;
    errorMessage: string | null;
} & { user: User | null};

const initialState: AuthState = {
    user: null,
    status: AuthStatus.CHECKING,
    errorMessage: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state: AuthState, { payload }: PayloadAction<User>) => {
            state.status = AuthStatus.AUTHENTICATED;
            state.user = payload;
            state.errorMessage = null;
        },
        logout: (state: AuthState) => {
            state.status = AuthStatus.NOT_AUTHENTICATED;
            state.user = null;
        },
        checkingCredentials: (state: AuthState) => {
            state.status = AuthStatus.CHECKING;
        },
        failAuth: (state: AuthState, { payload }: PayloadAction<string>) => {
            state.status = AuthStatus.NOT_AUTHENTICATED;
            state.errorMessage = payload;
        }
    }
})

export const { login, logout, checkingCredentials, failAuth } = authSlice.actions;
