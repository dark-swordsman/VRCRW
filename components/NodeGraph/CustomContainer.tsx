"use client";

import { Container } from "@pixi/react";
import { useRef } from "react";
import { Node, Relation } from "./GraphicsObjects";

export default function CustomContainer({ 
    size, 
    grabOffset, 
    zoom, 
    children 
}) {
    
    return (
        <Container position={[(size.w / 2) + grabOffset.x, (size.w / 4) + grabOffset.y]} scale={10 / zoom}>
            {children}
        </Container>    
    );
}