import { prisma } from "helpers";

class GraphNodeInterface {
    async getAll() {
        return await prisma.graphNode.findMany();
    }

    async getById(params: { id: string }) {
        return await prisma.graphNode.findUnique({
            where: {
                id: params.id
            }
        });
    }
}

export default new GraphNodeInterface();