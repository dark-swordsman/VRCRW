export default function Relation({ start, end, g }: {
        start: { x: number, y: number },
        end: { x: number, y: number },
        g: any
    }) {

    g.lineStyle({
            width: 5,
            color: 0x00aaaa
        })
        .moveTo(start.x, start.y)
        .lineTo(end.x, end.y);
}
