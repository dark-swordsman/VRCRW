import { NextResponse } from "next/server";
import { ResourceInterface } from "interfaces";

export async function GET(req: Request, { params }: { params: { id: string }}) {
    return NextResponse.json({ 
        resource: await ResourceInterface.getById({ id: params.id })
    });
}