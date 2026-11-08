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
