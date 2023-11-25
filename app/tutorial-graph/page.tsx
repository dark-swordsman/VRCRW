import { NodeGraph } from "components";
import {
    GraphNodeInterface,
    GraphRelationInterface,
    ResourceInterface,
} from "interfaces";

export default async function TutorialGraph() {
    const data = {
        graphNodes: await GraphNodeInterface.getAll(),
        graphRelations: await GraphRelationInterface.getAll(),
        resources: await ResourceInterface.getAll()
    }

    return (
        <NodeGraph data={data}/>
    );
}