import {Route, Routes} from "react-router-dom"
import {AuthRoutes} from "../auth/routes/AuthRoutes";
import {ArtRoutes} from "../arts/routes/ArtRoutes";
import {PrivateRoute} from "./PrivateRoute";
import {PublicRoute} from "./PublicRoute";
import {CheckingAuth} from "../ui";
import {AuthStatus} from "../store";
import {useCheckAuth} from "../hooks";

export const AppRouter = () => {

    const status = useCheckAuth();

    if (status === AuthStatus.CHECKING) {
        return <CheckingAuth />
    }

    return (
        <Routes>
            <Route
                path="/auth/*"
                element={
                    <PublicRoute>
                        <AuthRoutes />
                    </PublicRoute>
                }
            />

            <Route
                path="/*"
                element={
                    <PrivateRoute>
                        <ArtRoutes />
                    </PrivateRoute>
                }
            />
        </Routes>
    )
}
