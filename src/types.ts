export type Pixel = string | null;
export type Grid = Pixel[][]

export interface EditorState {
    grid: Grid;
    color: string;
    recentColors: string[];
    tool: Tool;
    past: Grid[];
    future: Grid[];
    stroke: {
        startX: number;
        startY: number;
        lastX: number;
        lastY: number;
    } | null;
}
export type Point = [number, number];
export interface ApplyToolAction {
    type: "applyTool",
    x:number,
    y:number,
    isStart: boolean
}
export interface ClearAction {
    type: "clear"
}

export interface SetColorAction{
    type: "setColor"
    color: string;
}
export interface SetToolAction{
    type: "setTool"
    tool: Tool;
}
export interface UndoAction {
    type: "undo"
}
export interface RedoAction {
    type: "redo"
}
export interface EndStrokeAction {
    type: "endStroke"
}
export interface ResizeAction {
    type: "resize"
    width:number
    height:number
}
export type EditorAction = ApplyToolAction | ClearAction | SetColorAction | SetToolAction | ResizeAction | UndoAction | RedoAction | EndStrokeAction;

export type Tool = "pencil" | "eraser" | "fill" | "eyedropper" | "line" | "rect"