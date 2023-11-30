"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { Node, Relation } from "./GraphicsObjects";
import { Graphics, useTick } from "@pixi/react";

import { NodeGraphContext } from "./NodeGraph";

export default function GraphicsRenderer({ 
    serializedGraphicsData, 
    windowData: {
        mousePosition,
        grabOffset,
        zoom,
    }  
}) {
    const [deltaTime, setDeltaTime] = useState(0);
    // const [isHoveringCount, setIsHoveringCount] = useState(0);
    let hoveringCount = 0;

    const { isHovering, setIsHovering } = useContext(NodeGraphContext);

    useTick((delta) => {
        setDeltaTime(deltaTime + delta);
    });

    function checkMouseHover(x, y, radius) {
        const result = (
            mousePosition.x < (x + radius) * zoom + grabOffset.x &&
            mousePosition.x > (x - radius) * zoom + grabOffset.x &&
            mousePosition.y < (y + radius) * zoom + grabOffset.y &&
            mousePosition.y > (y - radius) * zoom + grabOffset.y
        );

        if (result) hoveringCount++;

        return result;
    }

    return (
        <>
            <Graphics draw={(g) => {
                g.clear();
                serializedGraphicsData.forEach((obj) => {
                    switch (obj.type) {
                        case "relation":
                            Relation({
                                start: obj.start,
                                end: obj.end,
                                g
                            })
                            break;
                        case "node": 
                            Node({
                                x: obj.coords.x,
                                y: obj.coords.y,
                                radius: checkMouseHover(obj.coords.x, obj.coords.y, 12) ? 12 : 8,
                                g
                            });
                            break;
                    }
                });
                if (hoveringCount > 0 && !isHovering) setIsHovering(true);
                if (hoveringCount === 0 && isHovering) setIsHovering(false);
            }} />
        </>
    )


}