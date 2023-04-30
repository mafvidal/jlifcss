export enum StatusResponse {
    SUCCESS = "success",
    ERROR = "error"
}

type SuccessResponse<T> = {
    status: StatusResponse.SUCCESS,
    data: T
}

type ErrorResponse = {
    status: StatusResponse.ERROR,
    error: {
        errorCode: string;
        message: string;
    }
}

export type ApiCoreResponse<T> = SuccessResponse<T> | ErrorResponse;
