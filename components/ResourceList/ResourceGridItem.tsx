import { Resource } from "@prisma/client";

export default function ResourceGridItem({ resource }: { resource: Resource }) {
    return (
        <div className="relative overflow-hidden flex bg-slate-700 rounded-xl min-w-{2rem} max-w-{3rem} h-24 cursor-pointer hover:drop-shadow-xl">
            <div className="transition-opacity duration-[50ms] opacity-0 hover:opacity-20 absolute z-20 h-full w-full bg-slate-900" />
            
            <div className="w-full px-4 mt-2 z-10">
                <p className="text-xl font-bold truncate text-ellipsis overflow-hidden">{resource.name}</p>
                <div className="text-slate-400">{resource.link}</div>
            </div>
            <div className="absolute z-[5] w-full h-full bg-gradient-to-l from-slate-700" />
            <div className="absolute opacity-25 blur-[2px] bg-center bg-cover bg-[url('https://download.blender.org/branding/blender_logo_socket.png')] bg-clip-border bottom-0 h-full w-full "></div>
        </div>
    );
}