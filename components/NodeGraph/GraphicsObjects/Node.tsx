export default function Node({ x, y, radius = 15, g }: { x: number, y: number, radius?: number, g: any }) {
    g.lineStyle(0)
    .beginFill(0xffffff, 1)
    .drawCircle(x, y, radius)
    .endFill();
}
