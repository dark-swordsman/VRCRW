"use client";

import { useEffect, useRef, useState } from "react";
import { Node, Relation } from "./GraphicsObjects";
import { Graphics, useTick } from "@pixi/react";

export default function GraphicsRenderer({ 
    serializedGraphicsData, 
    windowData: {
        mousePosition,
        grabOffset
    }       
}) {
    const [deltaTime, setDeltaTime] = useState(0);

    useTick((delta) => {
        setDeltaTime(deltaTime + delta);
    });

    function checkMouseHover(x, y, radius) {
        return (
            mousePosition.x - grabOffset.x < x + radius &&
            mousePosition.x - grabOffset.x > x - radius &&
            mousePosition.y - grabOffset.y < y + radius &&
            mousePosition.y - grabOffset.y > y - radius
        );
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
            }} />
        </>
    )


}