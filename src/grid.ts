import type {Grid, Pixel} from "./types.ts";

export function inBounds(grid: Grid, x: number, y: number): boolean{
    const height = grid.length;
    const width =  height > 0 ? grid[0].length : 0;
    return  x >= 0 && x < width && y >= 0 && y <= height
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
    const newGrid = grid.map(row => [...row]);
    newGrid[y][x] = color;
    return newGrid;
}