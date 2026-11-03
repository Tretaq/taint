import type {Grid} from "../types.ts";
import {useEffect, useRef} from "react";

interface PixelCanvasProps {
    grid: Grid
    cellSize: number
    onPaint: (x: number, y: number) => void

}
export const PixelCanvas: React.FC<PixelCanvasProps> = ({grid,cellSize,onPaint}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rows = grid.length;
    const cols = rows > 0 ? grid[0].length : 0;
    const width = cols * cellSize;
    const height = rows * cellSize;
    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas) return;
        const ctx = canvas.getContext('2d');
        if(!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(let y = 0; y < rows; y++) {
            for(let x = 0; x < cols; x++) {
                const pixelColor = grid[y][x];
                ctx.fillStyle = grid[y][x] ?? '#E5E7EB';
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);

            }
        }

    },[grid,cellSize,width,height,rows,cols]);
    const eventToCell = (e: React.PointerEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if(!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        const x = Math.floor(clickX / cellSize);
        const y = Math.floor(clickY / cellSize);
        return {x , y};
    }
    const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
        const cell = eventToCell(e);
        if(!cell) return;
        console.log(cell.x + " " + cell.y)
        onPaint(cell.x, cell.y);
    }


    return <canvas ref={canvasRef} width={width} height={height}/>;

}