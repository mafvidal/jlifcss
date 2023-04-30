import {Art} from "../../../models/Art";
import {createSlice} from "@reduxjs/toolkit";

type ArtState = {
    arts: Art[] | [];
};

const initialState: ArtState = {
    arts: []
};

export const artSlice = createSlice({
    name: "art",
    initialState,
    reducers: {

    }
});
