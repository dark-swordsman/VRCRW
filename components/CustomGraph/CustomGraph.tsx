"use client";

import { GraphNode, GraphRelation, Resource } from "@prisma/client";
import { ReactNode, useEffect, useState } from "react";

type Circle = {
    pos: {
        x: number,
        y: number,
    },
    size: {
        w: number,
        h: number
    }
}

export default function CustomGraph({ data }: { data: { graphNodes: GraphNode[], graphRelations: GraphRelation[], resources: Resource[] }}) {
    const [circles, setCircles] = useState<Circle[]>([
        { pos: { x: 0, y: 0 }, size: { w: 20, h: 20 }},
        { pos: { x: 0, y: 0 }, size: { w: 20, h: 20 }},
        { pos: { x: 0, y: 0 }, size: { w: 20, h: 20 }},
        { pos: { x: 0, y: 0 }, size: { w: 20, h: 20 }},
        { pos: { x: 0, y: 0 }, size: { w: 20, h: 20 }},
        { pos: { x: 0, y: 0 }, size: { w: 20, h: 20 }},
        { pos: { x: 0, y: 0 }, size: { w: 20, h: 20 }},
        { pos: { x: 0, y: 0 }, size: { w: 20, h: 20 }},
        { pos: { x: 0, y: 0 }, size: { w: 20, h: 20 }},
        { pos: { x: 0, y: 0 }, size: { w: 20, h: 20 }},
    ])

    useTick([
        (({ time }) => {
            setCircles(circles.map(({ pos, size }, i) => {
                // (2 pi / length) * i
                return {
                    pos: {
                        x: Math.sin((time / 2000) + ((2 * Math.PI / circles.length) * i)) * 100,
                        // x: Math.sin(time / 200) + ((2 * Math.PI / circles.length) * i) * 80,
                        y: Math.cos((time / 2000) + ((2 * Math.PI / circles.length) * i)) * 100,
                        // y: Math.cos(time / 200) + ((2 * Math.PI / circles.length) * i) * 80,
                    },
                    size
                }
            }))

            // setPos({
            //     x: Math.sin(time / 200) * 80, 
            //     y: Math.cos(time / 200) * 80,
            // });
            // setSize({
            //     w: 50 + Math.sin(time / 1000) * 10,
            //     h: 50 + Math.sin(time / 1000) * 10,
            // })
        }).bind(this)
    ]);

    // useEffect(() => { 
    //     // return () => { clearInterval(ticker) };
    // }, [])
    
    return (
        // stage
        <Stage>
            <Container>
                {circles.map(({ pos, size }, i) => <Circle key={i} pos={pos} size={size} />)}
                
            </Container>
        </Stage>
    );
}

function Stage({ children }) {
    return <div className="relative overflow-hidden bg-red-900 flex-1 h-full mb-16">{children}</div>;
}

function Container({ children, pos = { x: 0, y: 0 } }: { children?: ReactNode, pos?: { x: number, y: number }}) {
    return (
        <div className="absolute h-0 w-0 bg-blue-900 top-[50%] left-[50%]">
            <div 
            className={`absolute h-0 w-0 bg-blue-900 scale-[300%]`} 
            // style={{ top:`${pos.x}px`, left: `${pos.y}px` }}
            >
                {children}
            </div>
        </div>
    )
}

function Circle({ pos = { x: 0, y: 0 }, size = { w: 50, h: 50 }}: { pos?: { x: number, y: number }, size?: { w: number, h: number } }) {
    return <div 
    className="absolute border-4 border-blue-400 rounded-full bg-white"
    style={{
        width: `${size.w}px`,
        height: `${size.h}px`,
        top: `${((size.h / 2) * -1) + pos.x}px`,
        left: `${((size.w / 2) * -1) + pos.y}px`,
    }}
    />;
}

function useTick(callbacks: [(({ time, deltaTime }: { time?: number, deltaTime? : number }) => void)]) {
    const [time, setTime] = useState(Date.now());
    const [deltaTime, setDeltaTime] = useState(0);
    const [targetFPS, setTargetFPS] = useState(60);

    function tick() {
        const _time = Date.now();

        callbacks.forEach((cb) => {
            cb({ time, deltaTime });
        });
        
        setDeltaTime(_time - time);
        setTime(_time);
    }
    
    useEffect(() => {
        setTimeout(tick.bind(this), 1000/targetFPS);
    }, [time]);
}



// const [circles, setCircles] = useState<Circle[]>([
//     { pos: { x: 0, y: 0 }, size: { w: 20, h: 20 }},
//     { pos: { x: 0, y: 0 }, size: { w: 20, h: 20 }},
//     { pos: { x: 0, y: 0 }, size: { w: 20, h: 20 }},
//     { pos: { x: 0, y: 0 }, size: { w: 20, h: 20 }},
//     { pos: { x: 0, y: 0 }, size: { w: 20, h: 20 }},
//     { pos: { x: 0, y: 0 }, size: { w: 20, h: 20 }},
//     { pos: { x: 0, y: 0 }, size: { w: 20, h: 20 }},
//     { pos: { x: 0, y: 0 }, size: { w: 20, h: 20 }},
//     { pos: { x: 0, y: 0 }, size: { w: 20, h: 20 }},
//     { pos: { x: 0, y: 0 }, size: { w: 20, h: 20 }},
// ])

// useTick([
//     (({ time }) => {
//         setCircles(circles.map(({ pos, size }, i) => {
//             // (2 pi / length) * i
//             return {
//                 pos: {
//                     x: Math.sin((time / 200) + ((2 * Math.PI / circles.length) * i)) * 100,
//                     // x: Math.sin(time / 200) + ((2 * Math.PI / circles.length) * i) * 80,
//                     y: Math.cos((time / 200) + ((2 * Math.PI / circles.length) * i)) * 100,
//                     // y: Math.cos(time / 200) + ((2 * Math.PI / circles.length) * i) * 80,
//                 },
//                 size
//             }
//         }))

//         // setPos({
//         //     x: Math.sin(time / 200) * 80, 
//         //     y: Math.cos(time / 200) * 80,
//         // });
//         // setSize({
//         //     w: 50 + Math.sin(time / 1000) * 10,
//         //     h: 50 + Math.sin(time / 1000) * 10,
//         // })
//     }).bind(this)
// ]);