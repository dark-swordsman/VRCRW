import { prisma } from "helpers";

class ResourceInterface {
    async getAll() {
        return await prisma.resource.findMany();
    }
    
    async getById(params: { id: string }) {
        return await prisma.resource.findUnique({
            where: {
                id: params.id
            }
        });
    }
}

export default new ResourceInterface();