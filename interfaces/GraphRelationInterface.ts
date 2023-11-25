import { prisma } from "helpers";

class GraphRelationInterface {
    async getAll() {
        return await prisma.graphRelation.findMany();
    }

    async getById(params: { id: string }) {
        return await prisma.graphRelation.findUnique({
            where: {
                id: params.id
            }
        });
    }
}

export default new GraphRelationInterface();