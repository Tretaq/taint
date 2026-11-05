import type {Grid} from "../types.ts";
import {useEffect, useRef} from "react";

interface PixelCanvasProps {
    grid: Grid
    cellSize: number
    onCellAction: (x: number, y: number, isStart:boolean) => void

}
export const PixelCanvas: React.FC<PixelCanvasProps> = ({grid,cellSize,onCellAction}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rows = grid.length;
    const cols = rows > 0 ? grid[0].length : 0;
    const width = cols * cellSize;
    const height = rows * cellSize;
    const isDrawing = useRef<boolean>(false);
    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas) return;
        const ctx = canvas.getContext('2d');
        if(!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(let y = 0; y < rows; y++) {
            for(let x = 0; x < cols; x++) {
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
        if(x >= 0 && x < cols && y >= 0 && y < rows) return {x , y};
        return;
    }

    const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
        canvasRef.current?.setPointerCapture(e.pointerId);
        isDrawing.current = true;
        const cell = eventToCell(e);
        if(!cell) return;
        onCellAction(cell.x, cell.y,true);
    }
    const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
        if(!isDrawing.current) return;

        const cell = eventToCell(e);
        if(cell) onCellAction(cell.x, cell.y,true);
    }
    const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
        isDrawing.current = false;
        canvasRef.current?.releasePointerCapture(e.pointerId);
    }


    return <canvas ref={canvasRef} width={width} height={height} onPointerCancel={handlePointerUp} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} />;

}