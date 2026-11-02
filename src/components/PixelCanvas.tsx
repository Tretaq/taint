import type {Grid} from "../types.ts";
import {useEffect, useRef} from "react";

interface PixelCanvas {
    grid: Grid
    cellSize: number
    onPaint: (x: number, y: number) => void

}
export const PixelCanvas: React.FC<PixelCanvas> = ({grid,cellSize,onPaint}) => {
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
                if(pixelColor) {
                    ctx.fillStyle = pixelColor;
                    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                } else {
                    ctx.fillStyle = '#E5E7EB';
                    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                }
            }
        }
    })
}