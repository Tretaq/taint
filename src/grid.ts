import type {Grid, Pixel, Point} from "./types.ts";

export function inBounds(grid: Grid, x: number, y: number): boolean{
    const height = grid.length;
    const width =  height > 0 ? grid[0].length : 0;
    return  x >= 0 && x < width && y >= 0 && y < height
}
export function createGrid(width: number, height: number): Grid {
    return Array.from({length: height}, () => Array(width).fill(null));

}
export function getPixel(grid: Grid, x: number, y: number): Pixel{
    if(!inBounds(grid, x, y)){
        return null;
    }
    return grid[y][x];
}
export function setPixel(grid: Grid, x: number, y: number, color: Pixel) {
    if(!inBounds(grid, x, y)){
        return grid;
    }
    if(getPixel(grid,x,y) === color){
        return grid;
    }
    const newGrid = grid.map(row => [...row]);
    newGrid[y][x] = color;
    return newGrid;
}
export const addRecentColor = (recentColors: string[], color:string) => {
    if(recentColors[0] === color){
        return recentColors;
    }
    const filteredColors = recentColors.filter(c => c !== color)
    return [color, ...filteredColors.slice(0, 8)];
}
export function getLinePoints(x0: number, y0: number , x1: number , y1: number): Point[]{
    const points: Point[] = [];
    const dx = Math.abs(x1 - x0);
    const dy = -Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx + dy
    let x = x0;
    let y = y0;

    for(;;) {
        points.push([x, y]);
        if(x === x1 && y === y1) break;
        const e2 = 2 * err;
        if(e2 >= dy) {
            err += dy;
            x += sx
        }
        if(e2 <= dx){
            err += dx;
            y += sy
        }
    }
    return points;
}
export function getRectPoints(x0:number,y0:number,x1:number,y1:number):Point[] {
    const left = Math.min(x0,x1);
    const right = Math.max(x0,x1);
    const top = Math.min(y0,y1);
    const bottom = Math.max(y0,y1);
    const points:Point[] = [];
    for(let x = left; x <= right; x++){
        points.push([x,top])
        if(bottom !== top) points.push([x,bottom]);
    }
    for(let y = top + 1 ; y < bottom; y++){
        points.push([left, y])
        if(right != left) points.push([right, y]);
    }
    return points;
}
export function painCells(grid: Grid, points:Point[], color: Pixel):Grid {
    let next: Grid | null = null;
    for(const [x,y] of points){
        if(!inBounds(grid, x, y)){
            continue;
        }
        const current = next ? next[y][x] : grid[y][x];
        if(current === color)continue;
        if(!next) next = grid.map(row => [...row]);
        next[y][x] = current;
    }
    return next ?? grid;
}
export function floodFill(grid: Grid, x: number, y: number, newcolor: Pixel):Grid {
    const height = grid.length;
    const width = height > 0 ? grid[0].length : 0;
    if(height === 0 || width === 0 || y < 0 || y >= height || x < 0 || x >= width) return grid;
    const targetColor = grid[y][x];
    if(targetColor === newcolor){
        return grid;
    }
    const nextGrid = grid.map(row => [...row]);// copy grid couse we cant copy
    const stack: [number,number] [] = [[x,y]];
    while(stack.length > 0){
        const [currentX, currentY] = stack.pop()!;
        if(currentX < 0 || currentX >= width || currentY < 0 || currentY >= height){
            continue;
        }
        if(nextGrid[currentY][currentX] !== targetColor){
            continue;
        }
        nextGrid[currentY][currentX] = newcolor;

        stack.push([currentX, currentY - 1]);
        stack.push([currentX, currentY + 1]);
        stack.push([currentX - 1, currentY]);
        stack.push([currentX + 1, currentY]);
    }
    return nextGrid;

}