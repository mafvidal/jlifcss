import {ArtLayout} from "../layout/ArtLayout";
import {ArtTable} from "../components/artTable/ArtTable";

export const OthersPage = () => {
    return (
        <ArtLayout
            title={"Otros"}
            category={"otros"}
        >
            <ArtTable category={"otros"}/>
        </ArtLayout>
    )
}
