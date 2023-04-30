import {AuthLayout} from "../layout/AuthLayout";
import {Button, Grid, Link, TextField, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {checkingAuthentication} from "../../store/slice/auth/thunks";
import {Link as RouterLink} from "react-router-dom";
import {LoginForm} from "../../models/Forms";
import {useMemo} from "react";
import {AuthStatus} from "../../store";

export const LoginPage = () => {

    const { status, errorMessage } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
    const isAuthenticating = useMemo(() => status === AuthStatus.CHECKING, [status]);

    const onLogin = async (data: LoginForm) => {
        dispatch(checkingAuthentication(data));
    }

    return (
        <AuthLayout title={"Ingresar"}>
            <form onSubmit={handleSubmit(onLogin)}>
                <Grid container>

                    <Grid item xs={ 12 } sx={{ mt: 2, minHeight: "80px" }}>
                        <TextField
                            error={ !!errors.userName }
                            helperText={errors.userName?.message }
                            label="Usuario"
                            type="text"
                            placeholder="Ingresa tu nombre de usuario"
                            fullWidth
                            {
                                ...register("userName", {
                                    required: 'Debe ingresar su nombre de usuario',
                                })
                            }
                        />
                    </Grid>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField
                            error={ errors.password?.type === 'required' }
                            helperText={errors.password?.message }
                            label="Contaseña"
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            fullWidth
                            {
                                ...register("password", {
                                    required: 'Debe ingresar su contraseña'
                                })
                            }
                        />
                    </Grid>

                    <Grid
                        container
                        spacing={ 2 }
                        sx={{ mb: 2, mt: 2 }}
                    >
                        <Grid item xs={12} >
                            <Button type="submit" variant="contained" fullWidth disabled={isAuthenticating}>
                                Login
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        {
                            !!errorMessage && <Typography variant="inherit" style={{color: "red"}}> Error al iniciar sesión</Typography>
                        }
                        <div/>
                    </Grid>

                </Grid>
            </form>
        </AuthLayout>
    )
}
