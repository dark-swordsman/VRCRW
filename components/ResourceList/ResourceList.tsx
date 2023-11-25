"use client";

import ResourceGridHeader from "./ResourceGridHeader";
import ResourceGridItem from "./ResourceGridItem";
import { Resource } from "@prisma/client";

export default function ResourceList({ resources }: { resources: Resource[] }) {

    return (
        <div className="mt-12">
            <ResourceGridHeader />
            <div className="grid gap-5 grid-flow-row-dense auto-row-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {resources.map((item) => <ResourceGridItem resource={item} />)}
            </div>
        </div>
    );
}