import ResourceGridHeader from "./ResourceGridHeader";
import ResourceGridItem from "./ResourceGridItem";

export default function ResourceList() {
    return (
        <div className="mt-12">
            <ResourceGridHeader />
            <div className="grid gap-5 grid-flow-row-dense auto-row-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <ResourceGridItem />
                <ResourceGridItem />
                <ResourceGridItem />
                <ResourceGridItem />
                <ResourceGridItem />
                <ResourceGridItem />
                <ResourceGridItem />
                <ResourceGridItem />
                <ResourceGridItem />
                <ResourceGridItem />
                <ResourceGridItem />
                <ResourceGridItem />
                <ResourceGridItem />
            </div>
        </div>
    );
}