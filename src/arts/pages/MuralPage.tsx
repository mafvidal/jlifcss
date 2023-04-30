import {ArtLayout} from "../layout/ArtLayout";
import {ArtTable} from "../components/artTable/ArtTable";

export const MuralPage = () => {
    return (
        <ArtLayout
            title={"Murales"}
            category={"murales"}
        >
            <ArtTable category={"murales"}/>
        </ArtLayout>
    )
}
