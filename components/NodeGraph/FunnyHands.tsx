"use client";

import { Sprite, useTick } from "@pixi/react";
import { useState } from "react";

export default function FunnyHands() {
    const numberOfHands = 10;
    
    const [testArray, setTestArray] = useState(Array.from({length: numberOfHands}, (_, i) => createHand(i, 0)));
    const [deltaTime, setDeltaTime] = useState(0);
    
    function createHand(index, increment) {
        return { x: Math.sin(Math.PI * (index/(numberOfHands/2)) + increment) * 100, y: Math.cos(Math.PI * (index/(numberOfHands/2)) + increment) * 100};
    }
    
    useTick((delta) => {
        setDeltaTime(deltaTime + delta);
        setTestArray(testArray.map((_, i) => createHand(i, Math.sin((deltaTime) / 50) * 5)));
    });

    return testArray.map((a, i) => <Sprite key={i} x={a.x} y={a.y} anchor={0.5} rotation={Math.sin(deltaTime / 50) * 15} image="https://cdn.discordapp.com/emojis/794514415772631060.gif?size=48&name=clap2&quality=lossless" />)
}