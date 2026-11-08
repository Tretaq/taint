import type {Grid} from "./types.ts";

const MAX_SIZE = 128;
const HEX_COLOR = /^#[0-9a-f]{6}$/i;

export function isGrid(value: unknown): value is Grid {
    if(!Array.isArray(value)) return false;
    const height = value.length;
    if(height === 0 || height > MAX_SIZE) return false;
    if(!Array.isArray(value[0])) return false;
    const width = value[0].length;
    if(width === 0 || width > MAX_SIZE) return false;

    return value.every(
        (row) =>
            Array.isArray(row) && row.length === width && row.every(
                (pixel) =>
                    pixel === null || (typeof pixel === "string" && HEX_COLOR.test(pixel))
            )
    )
}
function normalizeGrid(grid: Grid): Grid{
    return grid.map((row) => row.map((p) => (p === null ? null : p.toLowerCase())))
}
export function serializeProject(grid: Grid): string {
    return JSON.stringify({version: 1, grid});
}

export function parseProject(text: string): Grid{
    let data: unknown;
    try {
        data = JSON.parse(text);
    } catch {
        throw new Error("This file is not JSON.")
    }
    if(typeof data !== "object" || data === null || !("grid" in data)) {
        throw new Error("This file is not pixel grid");
    }
    const grid = data.grid;
    if(!isGrid(grid)) {
        throw new Error("Invalid project grid");
    }
    return normalizeGrid(grid);
}