import React, {useEffect, useRef, useState} from 'react';
// import { Box, Grid, IconButton, TextField } from '@mui/core';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { XYCoord } from 'dnd-core'
import {
    Box,
    Checkbox,
    FormControlLabel,
    Grid,
    IconButton,
    LinearProgress,
    TextField,
    FormGroup,
    Divider
} from "@mui/material";
import {FileProps} from "../../../models/MediaFile";


interface FileItemComponentProps {
    index: number;
    file: FileProps;
    deleteFile: (_: number) => void;
    moveFile: (dragIndex: number, hoverIndex: number) => void;
    changeToPrincipal: () => void;
}

export const ItemTypes = {
    CARD: 'card',
}

const style = {
    cursor: 'move',
}

export const FileItemComponent = ({index, file, deleteFile, moveFile, changeToPrincipal}: FileItemComponentProps ) => {
    const ref = useRef<HTMLDivElement>(null);
    const [ text, setText ] = useState("");
    const image = file.url ? file.url : URL.createObjectURL(file.file);
    const [checked, setChecked] = useState(true);

    useEffect(() => {
        setChecked(file.principal)
    }, [file.principal])

    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        hover(item: any, monitor: DropTargetMonitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            if (dragIndex === hoverIndex) {
                return
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            const clientOffset = monitor.getClientOffset()

            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            moveFile(dragIndex, hoverIndex);

            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: { type: ItemTypes.CARD, id: file.id, index },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })


    drag(drop(ref));

    return (
        <div ref={ref} style={{opacity: isDragging ? 0 : 1, marginBottom: "15px"}}>
            <Box display="flex" flexDirection="row" alignItems="center">

                <div style={{ width: "40px"}}>
                    <DragIndicatorIcon style={{ ...style }}/>
                </div>
                <Box sx={{ width: '60px' }}>
                    <div style={{marginRight: "10px", fontWeight: "bold", padding: "8px"}}>{ index + 1 }</div>
                </Box>

                <div style={{marginRight: "10px", width: "80px"}}>
                    <img alt="preview image" src={image} style={{maxWidth: "80px", maxHeight: "80px", margin: "auto"}}/>
                </div>

                <Box sx={{ width: '210px' }}>
                    { file.uploading
                        ? <LinearProgress />
                        : !file.error ? (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={changeToPrincipal}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                }
                                label="Portada"
                            />
                        ) : (
                            <span style={{ color: "red", fontWeight: "bold"}}>
                                {"Error al subir la imagen"}
                            </span>
                        )
                    }
                </Box>

                <div style={{ width: "40px"}}>
                    <IconButton
                        color="error"
                        onClick={() => deleteFile(index)}
                    >
                        <DeleteForeverIcon fontSize="large" />
                    </IconButton>
                </div>

            </Box>

            <div
                style={{
                    width: "430px"
                }}
            >
                <Divider style={{backgroundColor: "black"}} />
            </div>

        </div>
    );
};

