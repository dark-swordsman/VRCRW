import { ResourceList } from "../../components";
import { ResourceInterface } from "interfaces";

export default async function Resources() {
    const resources = await ResourceInterface.getAll();

    return (
        <ResourceList resources={resources}/>
    );
}