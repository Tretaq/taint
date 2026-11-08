import type {Grid} from "./types.ts";

export function gridToCanvas(grid: Grid , scale: number): HTMLCanvasElement {
    const rows = grid.length;
    const cols = rows > 0 ? grid[0].length : 0;
    const canvas = document.createElement('canvas');
    canvas.width = scale * cols;
    canvas.height = scale * rows;
    const ctx = canvas.getContext('2d');
    if(!ctx){
        throw new Error('Coudnt get context for 2D canvas');
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let y = 0; y < rows; y++) {
        for(let x = 0; x < cols; x++) {
            const color = grid[y][x];
            if(color !== null) {
                ctx.fillStyle = color;
                ctx.fillRect(x * scale, y * scale, scale , scale);
            }
        }
    }
    return canvas;
}