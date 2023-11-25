"use client";

import { Container, Graphics, Stage, Text } from "@pixi/react";
import { GraphNode, GraphRelation, Resource } from "@prisma/client";
import { TextStyle } from "pixi.js";
import { useState, useEffect, useRef, useCallback } from "react";

import FunnyHands from "./FunnyHands";
import CustomContainer from "./CustomContainer";
import { Node, Relation } from "./GraphicsObjects";
import GraphicsRenderer from "./GraphicsRenderer";
import GraphRelationInterface from "../../interfaces/GraphRelationInterface";

export default function NodeGraph({ data }: { data: { graphNodes: GraphNode[], graphRelations: GraphRelation[], resources: Resource[] }}) {
    // get width and height
    // default container position is that
    const [size, setSize] = useState({w: 100, h: 100});
    const [grabOffset, setGrabOffset] = useState({x: 0, y: 0});
    const [lastMousePosition, setLastMousePosition] = useState({x: 0, y: 0});
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(10);
    const [isGrabbing, setIsGrabbing] = useState(false);
    const [serializedGraphicsData, setSerializedGraphicsData] = useState([]);
    const [didMount, setDidMount] = useState(false);
    
    const stageRef = useRef(null);

    useEffect(() => {


        // console.log(data);
        // data.graphRelations.forEach((relation) => {
        //     setSerializedGraphicsData([...serializedGraphicsData, relation]);
        // });
        // data.graphNodes.forEach((node) => {
        //     setSerializedGraphicsData([...serializedGraphicsData, node]);
        // });

        const _graphRelations = [];

        data.graphRelations.forEach((relation) => {
            const _start = data.graphNodes.find((item) => item.id === relation.fromId);
            const _end = data.graphNodes.find((item) => item.id === relation.toId);

            _graphRelations.push({
                start: {
                    x: _start.coords.x,
                    y: _start.coords.y,
                },
                end: {
                    x: _end.coords.x,
                    y: _end.coords.y,
                }
            });
        });

        const _temp = [];
        for (let i = 0; i < 10; i++) {
            _temp.push({ pos: { x: (i - 5) * 100, y: 0} });
        }
        _graphRelations.forEach((item) => {
            _temp.push({
                type: "relation",
                ...item
            });
        });

        data.graphNodes.forEach(({ coords }) => {
            _temp.push({ 
                type: "node",
                coords,
            })
        });

        setSerializedGraphicsData(_temp);

        setDidMount(true);
    },[])

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

    function handleGrab(event, toGrab: boolean) {
        if ((toGrab && event.buttons == 1) || !toGrab) {
            setIsGrabbing(toGrab);
            setLastMousePosition({ x: event.clientX, y: event.clientY });
        }
    }

    function updateGrabOffest() {
        setGrabOffset({ x: mousePosition.x - lastMousePosition.x + grabOffset.x, y: mousePosition.y - lastMousePosition.y + grabOffset.y });
    }

    function handleScroll(event: React.WheelEvent<Element>) {
        // check mouse offset from edges, and also change offset to zoom around mouse position
        console.log(event.deltaY);
        setZoom(Math.max(4, Math.min(20, zoom + (event.deltaY/40))));
    }

    // data for draws

    const cma = {
        x: () => {
            return mousePosition.x - stageRef.current.offsetLeft - size.w / 2;
        },
        y: () => {
            return mousePosition.y - stageRef.current.offsetTop - size.w / 4;
        }
    }


    return (
        <div ref={stageRef} 
            onMouseDown={(e) => handleGrab(e, true)} 
            onMouseUp={(e) => handleGrab(e, false)} 
            onWheelCapture={(e) => handleScroll(e)} 
            onMouseLeave={(e) => handleGrab(e, false)}
        >
            {didMount && 
                <Stage className={"!w-full !h-full " + (isGrabbing ? "!cursor-grabbing" : "!cursor-grab") } width={size.w} height={size.w / 2}>
                    <Container interactive={true} position={[(size.w / 2) + grabOffset.x, (size.w / 4) + grabOffset.y]} scale={10 / zoom}>
                        <GraphicsRenderer serializedGraphicsData={serializedGraphicsData} windowData={{
                            mousePosition: { x: cma.x(), y: cma.y() },
                            grabOffset: grabOffset
                        }} />
                        {/* <FunnyHands /> */}
                    </Container>  
                    <Text x={8} y={5} text={`X: ${grabOffset.x}\nY: ${grabOffset.y}`} style={ new TextStyle({ fill: ["#888"], fontSize: 18 })}/>
                    <Text x={8} y={65} text={`mouse\nX: ${cma.x()}\nY: ${cma.y()}`} style={ new TextStyle({ fill: ["#888"], fontSize: 16 })}/>
                    <Text x={8} y={130} text={`zoom: ${1 / (zoom / 10)}`} style={ new TextStyle({ fill: ["#888"], fontSize: 16 })}/>
                </Stage>
            }
        </div>
    );
}