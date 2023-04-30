import {AppDispatch} from "../../store";
import {logout} from "../auth/authSlice";
import {CoreApi} from "../../../api/coreApi";
import {ArtResume} from "../../../models/Art";
import {StatusResponse} from "../../../api/coreApiResponses";
import {NewArt} from "../../../models/NewArt";
import {EditArt} from "../../../models/EditArt";

export const getArt = (category: string, page: number, limit: number) => {
    return async(dispatch: AppDispatch): Promise<{ arts: ArtResume[], total: number }> => {
        const response = await CoreApi.get<{ arts: ArtResume[], total: number }>("/art", {
            params: {
                category,
                page,
                limit
            }
        });
        if (response.status === StatusResponse.ERROR && response.error.errorCode === "Unauthorized") {
            dispatch(logout());
            throw new Error("Error al editar la obra. Por favor vuelva a intentar nuevamente en unos instantes");
        } else if (response.status === StatusResponse.ERROR) {
            return {arts: [], total: 0};
        } else {
            return response.data;
        }
    }
}

export const changeShowArt = (artId: string) => {
    return async(dispatch: AppDispatch): Promise<{ message: string }> => {
        const response = await CoreApi.put<{ message: string }>(`/art/show/${artId}`, {});

        if (response.status === StatusResponse.ERROR && response.error.errorCode === "Unauthorized") {
            dispatch(logout());
            throw new Error("Error al editar la obra. Por favor vuelva a intentar nuevamente en unos instantes");
        } else if (response.status === StatusResponse.ERROR) {
            return {message: ""};
        } else {
            return response.data;
        }

    }
}

export const deleteArt = (artId: string) => {
    return async(dispatch: AppDispatch): Promise<{ message: string }> => {
        const response = await CoreApi.delete<{ message: string }>(`/art/${artId}`, {});

        if (response.status === StatusResponse.ERROR && response.error.errorCode === "Unauthorized") {
            dispatch(logout());
            throw new Error("Error al editar la obra. Por favor vuelva a intentar nuevamente en unos instantes");
        } else if (response.status === StatusResponse.ERROR) {
            return {message: ""};
        } else {
            return response.data;
        }

    }
}

export const changeArtOrder = (artId: string, category: string, newOrder: number, lastOrder: number) => {
    return async(dispatch: AppDispatch): Promise<{ message: string }> => {
        const response = await CoreApi.put<{ message: string }>(`/art/order/${artId}`, {
            newOrder,
            lastOrder,
            category
        });

        if (response.status === StatusResponse.ERROR && response.error.errorCode === "Unauthorized") {
            dispatch(logout());
            throw new Error("Error al editar la obra. Por favor vuelva a intentar nuevamente en unos instantes");
        } else if (response.status === StatusResponse.ERROR) {
            return {message: ""};
        } else {
            return response.data;
        }

    }
}

export const uploadFile = (data: FormData) => {
    return async(dispatch: AppDispatch): Promise<{ mediaId: string }> => {
        const response = await CoreApi.post<{ mediaId: string }>("/media/upload/", data);

        if (response.status === StatusResponse.ERROR && response.error.errorCode === "Unauthorized") {
            dispatch(logout());
            throw new Error("Error al editar la obra. Por favor vuelva a intentar nuevamente en unos instantes");
        } else if (response.status === StatusResponse.ERROR) {
            return {mediaId: ""};
        } else {
            return response.data;
        }

    }
}

export const createArt = (data: NewArt) => {
    return async(dispatch: AppDispatch): Promise<{ art: NewArt }> => {
        const response = await CoreApi.post<{ art: NewArt }>("/art", data);

        if (response.status === StatusResponse.ERROR && response.error.errorCode === "Unauthorized") {
            dispatch(logout());
            throw new Error("Error al editar la obra. Por favor vuelva a intentar nuevamente en unos instantes");
        } else if (response.status === StatusResponse.ERROR) {
            throw new Error("Error al crear la obra. Por favor vuelva a intentar nuevamente en unos instantes");
        } else {
            return response.data;
        }

    }
}

export const getArtById = (id: string) => {
    return async(dispatch: AppDispatch): Promise<{ art: EditArt }> => {
        const response = await CoreApi.get<{ art: EditArt }>(`/art/${id}`);

        if (response.status === StatusResponse.ERROR && response.error.errorCode === "Unauthorized") {
            dispatch(logout());
            throw new Error("Error al editar la obra. Por favor vuelva a intentar nuevamente en unos instantes");
        } else if (response.status === StatusResponse.ERROR) {
            throw new Error("Error al crear la obra. Por favor vuelva a intentar nuevamente en unos instantes");
        } else {
            return response.data;
        }
    }
}

export const editArt = (data: NewArt, id: string) => {
    return async(dispatch: AppDispatch): Promise<{ art: NewArt }> => {
        const response = await CoreApi.put<{ art: NewArt }>(`/art/${id}`, data);

        if (response.status === StatusResponse.ERROR && response.error.errorCode === "Unauthorized") {
            dispatch(logout());
            throw new Error("Error al editar la obra. Por favor vuelva a intentar nuevamente en unos instantes");
        } else if (response.status === StatusResponse.ERROR) {
            throw new Error("Error al editar la obra. Por favor vuelva a intentar nuevamente en unos instantes");
        } else {
            return response.data;
        }

    }
}

export const deleteMedias = (ids: string[]) => {
    return async(dispatch: AppDispatch): Promise<{ message: string }> => {
        const response = await CoreApi.put<{ message: string }>(`/media`, {ids});

        if (response.status === StatusResponse.ERROR && response.error.errorCode === "Unauthorized") {
            dispatch(logout());
            throw new Error("Error al editar la obra. Por favor vuelva a intentar nuevamente en unos instantes");
        } else if (response.status === StatusResponse.ERROR) {
            throw new Error("Error al editar la obra. Por favor vuelva a intentar nuevamente en unos instantes");
        } else {
            return response.data;
        }

    }
}
