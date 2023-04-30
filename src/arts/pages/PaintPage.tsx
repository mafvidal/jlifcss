import {ArtLayout} from "../layout/ArtLayout";
import {ArtTable} from "../components/artTable/ArtTable";

export const PaintPage = () => {
    return (
        <ArtLayout
            title={"Pinturas"}
            category={"pinturas"}
        >
            <ArtTable category={"pinturas"}/>
        </ArtLayout>
    )
}
