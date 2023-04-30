import {ArtLayout} from "../layout/ArtLayout";
import {ArtTable} from "../components/artTable/ArtTable";

export const SketchPage = () => {
    return (
        <ArtLayout
            title={"Bocetos"}
            category={"bocetos"}
        >
            <ArtTable category={"bocetos"}/>
        </ArtLayout>
    )
}
