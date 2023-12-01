import { CustomGraph } from "components";
import {
    GraphNodeInterface,
    GraphRelationInterface,
    ResourceInterface,
} from "interfaces";

export default async function CustomGraphPage() {
    const data = {
        graphNodes: await GraphNodeInterface.getAll(),
        graphRelations: await GraphRelationInterface.getAll(),
        resources: await ResourceInterface.getAll()
    }

    return (
        <CustomGraph data={data}/>
    );
}