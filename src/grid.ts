import type {Grid, Pixel} from "./types.ts";

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