import {checkingCredentials, failAuth, login, logout} from "./authSlice"
import {AppDispatch} from "../../store";
import {CoreApi} from "../../../api/coreApi";
import {Buffer} from "buffer";
import {StatusResponse} from "../../../api/coreApiResponses";
import {AuthResponse} from "./apiResponse";
import {LoginForm, RegisterForm} from "../../../models/Forms";
import {User} from "../../../models/User";

export const checkingAuthentication = (data: LoginForm) => {
    return async(dispatch: AppDispatch) => {
        dispatch(checkingCredentials());

        const response = await CoreApi.post<AuthResponse>("/auth/login", {
            username: data.userName,
            password: data.password
        });

        if (response.status === StatusResponse.SUCCESS) {
            localStorage.setItem('token', response.data.token);
            return dispatch(login(response.data.user));
        }

        const errorMessage = response.status === StatusResponse.ERROR ? response.error.message : '';
        dispatch(failAuth(errorMessage));
    }
}

export const checkSession = () => {
    return async(dispatch: AppDispatch) => {
        console.log("LLAMO")
        dispatch(checkingCredentials());
        const token = localStorage.getItem("token");
        if (!token) {
            localStorage.clear();
            dispatch(logout());
            return;
        }

        const response = await CoreApi.get<{ user: User }>("/auth/user");

        if (response.status === StatusResponse.ERROR) {
            localStorage.clear();
            dispatch(logout());
            return;
        }

        if (response.data.user) {
            dispatch(login(response.data.user));
        }
    }
}

export const closeSession = () => {
    return async(dispatch: AppDispatch) => {
        localStorage.clear();
        dispatch(logout());
    }
}
