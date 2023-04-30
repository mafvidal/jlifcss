import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppDispatch} from "../../../hooks";
import {changeArtOrder, changeShowArt, deleteArt, getArt} from "../../../store/slice/art/thunks";
import React, {useEffect, useState} from "react";
import {ArtResume} from "../../../models/Art";
import {Image} from "@mui/icons-material";
import {Backdrop, Button, CircularProgress, IconButton, Pagination} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {SplitButton} from "./StateButton";
import {ArtDialog} from "./ArtDialog";
import {ChangeOrderDialog} from "./ChangeOrderDialog";
import {useNavigate} from "react-router-dom";

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


interface Props {
    category: string
}

export const ArtTable = ({ category }: Props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [showDeleteDialog, setShowDeleteDialog] = useState<{show: boolean, id: string | undefined}>({
        show: false,
        id: undefined
    });
    const [changeOrderDialog, setChangeOrderDialog] = useState<{show: boolean, order: number | undefined, id: string | undefined}>({
        show: false,
        order: undefined,
        id: undefined
    });
    const [showLoading, setShowLoading] = useState(true);
    const [ arts, setArts ] = useState<ArtResume[]>([]);
    const [ paginationProps, setPaginationProps ] = useState<{page: number, limit: number, total: number}>({
        page: 0,
        limit: 25,
        total: 0
    });

    const getAllArts = async (page: number) => {
        setShowLoading(true);
        const result = await dispatch(getArt(category, page, paginationProps.limit));
        setArts(result.arts);
        setPaginationProps({
            ...paginationProps,
            page: page,
            total: result.total
        });
        setShowLoading(false);
    }

    const handleChange = async (event: React.ChangeEvent<unknown>, value: number) => {
        if (value - 1 !== paginationProps.page) {
            await getAllArts(value - 1);
        }
    };

    const onChangeShowState = async (id: string) => {
        setShowLoading(true);
        await dispatch(changeShowArt(id));
        await getAllArts(paginationProps.page);
    }

    const onDelete = async (accept: boolean) => {
        setShowDeleteDialog({show: false, id: undefined});
        setShowLoading(true);
        if (accept && showDeleteDialog.id) {
            await dispatch(deleteArt(showDeleteDialog.id));
            await getAllArts(paginationProps.page);
        }
    }

    const onChangeOrder = async (accept: boolean, newOrder?: number) => {
        if (accept && changeOrderDialog.id && newOrder !== undefined && changeOrderDialog.order !== undefined) {
            const finalOrder = newOrder < 0 ? 0 : newOrder >= paginationProps.total ? paginationProps.total - 1 : newOrder;
            await dispatch(changeArtOrder(changeOrderDialog.id, category, finalOrder, changeOrderDialog.order));
            await getAllArts(paginationProps.page);
        }
        setChangeOrderDialog({show: false, id: undefined, order: undefined});
    }

    const onEditArt = (id: string, category: string) => {
        navigate(`/editar/${category}/${id}`);
    }

    useEffect(() => {
        getAllArts(paginationProps.page);
    }, [])

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {/*<TableCell align="left">Dessert (100g serving)</TableCell>*/}
                            <TableCell
                                align="left"
                                width="5%"
                            >
                                Orden
                            </TableCell>
                            <TableCell
                                align="left"
                                width="10%"
                            >
                                Imagen Principal
                            </TableCell>
                            <TableCell
                                align="left"
                                width="15%"
                            >
                                Titulo
                            </TableCell>
                            <TableCell
                                align="left"
                                width="25%"
                            >
                                Descripción
                            </TableCell>
                            <TableCell
                                align="left"
                                width="45%"
                            >
                                Acciones
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {arts.map((art) => (
                            <TableRow
                                key={art._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell
                                    align="left"
                                    width="5%"
                                >
                                    {art.order + 1}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    width="10%"
                                >
                                    <img alt={art.title} src={art.image} style={{maxWidth: "40px", maxHeight: "40px", margin: "auto"}} />
                                </TableCell>
                                <TableCell
                                    align="left"
                                    width="15%"
                                >
                                    {art.title}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    width="25%"
                                >
                                    { art.description.length > 20 ? `${art.description.slice(0,58)}...` : art.description }
                                </TableCell>
                                <TableCell
                                    align="left"
                                    width="45%"
                                >
                                    <Button
                                        variant="outlined"
                                        style={{marginRight: "5px"}}
                                        onClick={() => { setChangeOrderDialog({ show: true, id: art._id, order: art.order }) }}
                                    >
                                        Cambiar Orden
                                    </Button>
                                    <SplitButton
                                        id={art._id}
                                        onChangeShow={onChangeShowState}
                                        show={art.show}
                                    />
                                    <IconButton
                                        aria-label="delete"
                                        color="primary"
                                        onClick={() => { onEditArt(art._id, category) }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        aria-label="delete"
                                        color="error"
                                        onClick={() => { setShowDeleteDialog({ show: true, id: art._id }) }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {
                paginationProps.total > paginationProps.limit && (
                    <div style={{display: "flex", justifyContent: "flex-end", margin: "10px"}}>
                        <Pagination
                            count={paginationProps.total / paginationProps.limit}
                            page={paginationProps.page + 1}
                            onChange={handleChange}
                            color="primary"
                        />
                    </div>
                )
            }

            <ArtDialog
                open={showDeleteDialog.show}
                onClose={onDelete}
            />

            <ChangeOrderDialog
                open={changeOrderDialog.show}
                onClose={onChangeOrder}
            />

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={showLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

        </>
    );
}
