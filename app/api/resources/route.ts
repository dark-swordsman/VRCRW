import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import ResourceInterface from "../../../interfaces/ResourceInterface";

export async function GET(req: Request) {
    return NextResponse.json({ 
        resources: await ResourceInterface.getAll() 
    });
}