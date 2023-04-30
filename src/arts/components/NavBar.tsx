import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks";
import {closeSession} from "../../store/slice/auth/thunks";
import {useNavigate} from "react-router-dom";

export const NavBar = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector(state => state.auth);

    const onLogout = () => {
        dispatch(closeSession());
    }

    const navigateTo = (link: string) => {
        navigate(link);
    }

    return (
        <AppBar
            position='fixed'
        >
            <Toolbar>
                {/*<IconButton*/}
                {/*    color='inherit'*/}
                {/*    edge="start"*/}
                {/*    sx={{ mr: 2, display: { sm: 'none' } }}*/}
                {/*>*/}
                {/*    <MenuOutlined />*/}
                {/*</IconButton>*/}

                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Grid item alignItems='center' sx={{ display: 'flex', flexShrink: 1 }}>
                        <Typography variant='h6' noWrap component='div' mr={2} style={{cursor: "pointer"}} onClick={() => navigateTo("/esculturas")}> Esculturas </Typography>
                        <Typography variant='h6' noWrap component='div' mr={2} style={{cursor: "pointer"}} onClick={() => navigateTo("/pinturas")}> Pinturas </Typography>
                        <Typography variant='h6' noWrap component='div' mr={2} style={{cursor: "pointer"}} onClick={() => navigateTo("/murales")}> Murales </Typography>
                        <Typography variant='h6' noWrap component='div' mr={2} style={{cursor: "pointer"}} onClick={() => navigateTo("/escenografias")}> Escenografia </Typography>
                        <Typography variant='h6' noWrap component='div' mr={2} style={{cursor: "pointer"}} onClick={() => navigateTo("/bocetos")}> Bocetos </Typography>
                        <Typography variant='h6' noWrap component='div' mr={2} style={{cursor: "pointer"}} onClick={() => navigateTo("/otros")}> Otros </Typography>
                    </Grid>

                    <Grid item alignItems='center' sx={{ display: 'flex', flexShrink: 1 }}>
                        <Typography>
                            <b>{user?.name}</b>
                        </Typography>
                        <IconButton color='error' onClick={onLogout}>
                            <LogoutOutlined />
                        </IconButton>
                    </Grid>

                </Grid>

            </Toolbar>
        </AppBar>
    )
}
