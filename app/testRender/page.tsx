"use client";

import { Stage, Sprite, Container, useTick, useApp } from "@pixi/react";
import { useState, useEffect, useRef} from "react";

function CustomContainer({ size, grabOffset, zoom }) {
    const numberOfHands = 10;

    const [testArray, setTestArray] = useState(Array.from({length: numberOfHands}, (_, i) => createHand(i, 0)));
    const [deltaTime, setDeltaTime] = useState(0);
    
    function createHand(index, increment) {
        return { x: Math.sin(Math.PI * (index/(numberOfHands/2)) + increment) * 100, y: Math.cos(Math.PI * (index/(numberOfHands/2)) + increment) * 100};
    }
    
    useTick((delta) => {
        setDeltaTime(deltaTime + delta);
        setTestArray(testArray.map((_, i) => createHand(i, Math.sin(((deltaTime) / 50)) * 5)));
    });

    return (
        <Container position={[(size.w / 2) + grabOffset.x, (size.w / 4) + grabOffset.y]} scale={10 / zoom}>
            {testArray.map((a, i) => <Sprite key={i} x={a.x} y={a.y} image="https://cdn.discordapp.com/emojis/794514415772631060.gif?size=48&name=clap2&quality=lossless" />)}
        </Container>    
    );
}

export default function TestRender() {
    // get width and height
    // default container position is that
    const [size, setSize] = useState({w: 100, h: 100});
    const [grabOffset, setGrabOffset] = useState({x: 0, y: 0});
    const [lastMousePosition, setLastMousePosition] = useState({x: 0, y: 0});
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(10);
    const [isGrabbing, setIsGrabbing] = useState(false);
    const [tick, updateTick] = useState(0);
    const [intervalID, setIntervalID] = useState(undefined);
    
    
    const stageRef = useRef(null);

    useEffect(() => {
        window.addEventListener("mousemove", updateMousePos);

        return () => { window.removeEventListener("mousemove", updateMousePos) };
    }, [grabOffset]);

    function updateMousePos(event) {
        setLastMousePosition(mousePosition);
        setMousePosition({ x: event.clientX, y: event.clientY });
    }

    useEffect(() => {
        if (stageRef.current) setSize({ w: stageRef.current.offsetWidth, h: stageRef.current.offsetHeight });
    }, [stageRef]);

    useEffect(() => {
        if (isGrabbing) updateGrabOffest();
    }, [isGrabbing, mousePosition]);

    function handleGrab(event, toGrab:boolean) {
        if ((toGrab && event.buttons == 1) || !toGrab) {
            setIsGrabbing(toGrab);
            setLastMousePosition({ x: event.clientX, y: event.clientY });
        }
    }

    function updateGrabOffest() {
        setGrabOffset({ x: mousePosition.x - lastMousePosition.x + grabOffset.x, y: mousePosition.y - lastMousePosition.y + grabOffset.y });
    }

    function handleScroll(event) {
        // check mouse offset from edges, and also change offset to zoom around mouse position
        console.log(event.deltaY);
        setZoom(Math.max(4, Math.min(20, zoom + (event.deltaY/40))));
    }

    return (
        <div ref={stageRef} onMouseDown={(e) => handleGrab(e, true)} onMouseUp={(e) => handleGrab(e, false)} onWheelCapture={(e) => handleScroll(e)}>
            <Stage className={"!w-full !h-full " + (isGrabbing ? "cursor-grabbing" : "cursor-grab") } width={size.w} height={size.w / 2}>
                <CustomContainer size={size} grabOffset={grabOffset} zoom={zoom} />
            </Stage>
        </div>
    );
}