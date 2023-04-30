import { Navigate, Route, Routes } from "react-router-dom";
import { MuralPage, PaintPage, SculpturePage, ScenographyPage, SketchPage, OthersPage } from "../pages";
import {NewArtPage} from "../pages/NewArtPage";
import {EditArtPage} from "../pages/EditArtPage";

export const ArtRoutes = () => {
    return (
        <Routes>
            <Route path="/esculturas" element={ <SculpturePage />}/>
            <Route path="/pinturas" element={ <PaintPage />}/>
            <Route path="/murales" element={ <MuralPage />}/>
            <Route path="/escenografias" element={ <ScenographyPage />}/>
            <Route path="/bocetos" element={ <SketchPage />}/>
            <Route path="/otros" element={ <OthersPage />}/>

            <Route path="/crear/:category" element={ <NewArtPage />}/>
            <Route path="/editar/:category/:id" element={ <EditArtPage />}/>

            <Route path="/*" element={ <Navigate to="/esculturas" />}/>
        </Routes>
    )
}
