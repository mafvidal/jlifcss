import {ArtLayout} from "../layout/ArtLayout";
import {ArtTable} from "../components/artTable/ArtTable";

export const SculpturePage = () => {

    return (
        <ArtLayout
            title={"Esculturas"}
            category={"esculturas"}
        >
            <ArtTable category={"esculturas"}/>
        </ArtLayout>
    )
}
