export type Pixel = string | null;
export type Grid = Pixel[][]

export interface EditorState {
    grid: Grid;
    color: string;
    recentColors: string[];
    tool: Tool;
}
export interface PaintAction {
    type: "paint"
    x:number;
    y:number;
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
    SelectedTool: Tool;
}

export type EditorAction = PaintAction | ClearAction | SetColorAction | SetToolAction;

export type Tool = "pencil" | "eraser" | "fill" | "eyedropper"