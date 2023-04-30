import React from "react";
import {Box, Button, Toolbar, Typography} from "@mui/material";
import {NavBar} from "../components/NavBar";
import {useNavigate} from "react-router-dom";

interface Props {
    children: React.ReactNode;
    title?: string;
    hideNew?: boolean;
    category?: string
}

export const ArtLayout = ({ children, title, hideNew = false, category }: Props) => {
    const navigate = useNavigate();

    const navigateTo = () => {
        navigate(`/crear/${category}`);
    }

    return (
        <Box sx={{ display: 'flex'}}>

            <NavBar />

            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3}}
            >

                <Toolbar />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px 15px",
                    }}
                >
                    <Typography variant="h4" component="h2">
                        {title}
                    </Typography>
                    {
                        !hideNew && (
                            <Button
                                variant="contained"
                                onClick={navigateTo}
                            >
                                Nueva
                            </Button>
                        )
                    }

                </div>
                {children}
            </Box>

        </Box>
    )
}
