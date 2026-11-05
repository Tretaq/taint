export type Pixel = string | null;
export type Grid = Pixel[][]

export interface EditorState {
    grid: Grid;
    color: string;
    recentColors: string[];
    tool: Tool;
}
export interface applyToolAction {
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

export type EditorAction = applyToolAction | ClearAction | SetColorAction | SetToolAction;

export type Tool = "pencil" | "eraser" | "fill" | "eyedropper"