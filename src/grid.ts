import type {Grid, Pixel} from "./types.ts";

export function createGrid(width: number, height: number): Grid {
    return Array.from({length: height}, () => Array(width).fill(null));
}
export function getPixel(grid: Grid, x: number, y: number): Pixel{
    return grid[y][x];
}
export function setPixel(grid: Grid, x: number, y: number, color: Pixel) {
    const newGrid = grid.map(row => [...row]);
    newGrid[y][x] = color;
    return newGrid;
}