import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch} from "../../hooks";
import React, {ChangeEvent, useEffect, useState} from "react";
import {FileProps} from "../../models/MediaFile";
import {createArt, deleteMedias, editArt, getArtById, uploadFile} from "../../store/slice/art/thunks";
import {toast, ToastContainer} from "react-toastify";
import {NewArt} from "../../models/NewArt";
import {ArtLayout} from "../layout/ArtLayout";
import {Backdrop, Button, CircularProgress, Fab, TextField} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {FilesTable} from "../components/newArt/FilesTable";
import SaveIcon from "@mui/icons-material/Save";

export const EditArtPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    let { id, category } = useParams();
    const [showLoading, setShowLoading] = useState(false);
    const [filesToRemove, setFilesToRemove] = useState<string[]>([]);
    const [information, setInformation] = useState<{
        title: string;
        description: string;
        date: string;
    }>({
        title: "",
        description: "",
        date: ""
    });
    const [files, setFiles] = useState<FileProps[]>([]);

    const addFileToRemove = (id: string) => {
        setFilesToRemove([...filesToRemove, id]);
    }

    const getArt = async () => {
        setShowLoading(true);
        if (!id) {
            return showToastError("Error al buscar el contenido", true);
        }
        try {
            const { art } = await dispatch(getArtById(id!));
            setInformation({
                title: art.title,
                description: art.description || "",
                date: art.date || ""
            });
            const images: FileProps[] = art.images.map(image => ({
                position: image.order,
                id: image.id,
                file: {} as File,
                uploading: false,
                principal: image.principal,
                error: false,
                url: image.url
            }));
            setFiles([...images]);
            setShowLoading(false);
        } catch (e) {
            return showToastError("Error al buscar el contenido", true)
        }
    }

    const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        const filesSelected = e.target.files;
        const filesToUpload: FileProps[] = [];
        for (let i = 0; i < filesSelected.length; i++) {
            const file = filesSelected[i];
            const position = files.length + i;
            filesToUpload.push({
                position: position,
                id: position.toString(),
                file: file,
                uploading: true,
                principal: files.length === 0 && i === 0,
                error: false
            })
        }
        setFiles(data => {
            return [...data, ...filesToUpload]
        });
        for (const file of filesToUpload) {
            const data = new FormData();
            data.append("file", file.file);
            const result = await dispatch(uploadFile(data));
            file.id = result.mediaId;
            file.uploading = false;
            if (!result.mediaId) {
                file.error = true;
            }
        }

        setFiles(data => {
            return [...data]
        });
    };

    const showToastError = (message: string, goBack: boolean = false) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            onClose: () => {
                setShowLoading(false);
                if (goBack) {
                    navigate(`/${category}`);
                }
            }
        });
    }

    const showToastSuccess =  (message: string) => {
        toast.success(message, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            onClose: () => {
                setShowLoading(false);
                navigate(`/${category}`);
            }
        });
    }

    const isValid = (): boolean => {
        const principalSelected = !!files.find(file => file.principal);
        const uploadingImage = files.filter(file => file.uploading);
        if (!information.title) {
            showToastError("Debe completar el campo Titulo");
            return false;
        }
        if (files.length === 0) {
            showToastError("Debe subir alguna imagen");
            return false;
        }
        if (!principalSelected) {
            showToastError("Debe seleccionar una imagen como principal");
            return false;
        }
        if (uploadingImage.length > 0) {
            showToastError("Debe esperar a que todas las imagenes se suban");
            return false;
        }
        return true;
    }

    const onEditArt = async () => {
        if (!isValid()) {
            return;
        }
        setShowLoading(true);
        const art: NewArt = {
            category: category || "otros",
            title: information.title,
            description: information.description,
            date: information.date,
            images: files.filter(file => !file.error).map((file, index) => ({
                id: file.id,
                principal: file.principal,
                order: index
            }))
        }

        try {
            await dispatch(editArt(art, id!));
            if (filesToRemove.length > 0) {
                await dispatch(deleteMedias(filesToRemove));
            }
            showToastSuccess("Obra creada existosamente!!");
        } catch (e) {
            setShowLoading(false);
            showToastError("Error al editar la obra. Por favor intente nuevamente en unos instantes");
        }
    }

    useEffect(() => {
        getArt();
    }, [])

    return (
        <div
            style={{
                width: "860px",
                margin: "auto"
            }}
        >
            <ArtLayout
                title={"Editar obra en sección " + category}
                hideNew
            >

                <TextField
                    style={{
                        marginBottom: "15px"
                    }}
                    label="Titulo"
                    variant="outlined"
                    fullWidth
                    value={information.title}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setInformation({...information, title: event.target.value});
                    }}
                />
                <TextField
                    style={{
                        marginBottom: "15px"
                    }}
                    label="Fecha"
                    variant="outlined"
                    fullWidth
                    value={information.date}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setInformation({...information, date: event.target.value});
                    }}
                />

                <TextField
                    style={{
                        marginBottom: "15px"
                    }}
                    label="Descripción"
                    multiline
                    fullWidth
                    rows={4}
                    value={information.description}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setInformation({...information, description: event.target.value});
                    }}
                />

                <div
                    style={{
                        marginBottom: "10px"
                    }}
                >
                    <span
                        style={{
                            fontSize: "20px",
                            color: "rgb(97, 97, 132)",
                            fontWeight: "700",
                            fontFamily: "sans-serif",
                            margin: "20px 0px"
                        }}
                    >
                        Subir imágenes (Max 10mb)
                    </span>
                </div>

                <div>
                    <Button
                        variant="outlined"
                        component="label"
                        startIcon={<UploadFileIcon />}
                    >
                        Subir imágenes
                        <input
                            onChange={handleFileUpload}
                            type="file"
                            hidden
                            multiple
                            accept="image/*"
                        />
                    </Button>
                </div>

                <div
                    style={{
                        width: "100%"
                    }}
                >
                    <DndProvider backend={HTML5Backend}>
                        <FilesTable files={files} setFiles={setFiles} setFileToRemove={addFileToRemove} />
                    </DndProvider>
                </div>

                <div
                    style={{
                        position: "fixed",
                        bottom: "15px",
                        right: "15px"
                    }}
                >
                    <Fab
                        variant="extended"
                        size="medium"
                        color="primary"
                        aria-label="add"
                        onClick={onEditArt}
                    >
                        <SaveIcon sx={{ mr: 1 }} />
                        Guardar
                    </Fab>
                </div>

            </ArtLayout>
            <ToastContainer />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={showLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}
