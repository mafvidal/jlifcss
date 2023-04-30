import {ArtLayout} from "../layout/ArtLayout";
import {ArtTable} from "../components/artTable/ArtTable";

export const ScenographyPage = () => {
    return (
        <ArtLayout
            title={"Escenografias"}
            category={"escenografias"}
        >
            <ArtTable category={"escenografias"}/>
        </ArtLayout>
    )
}
