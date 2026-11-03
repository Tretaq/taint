export type Pixel = string | null;
export type Grid = Pixel[][]

export interface EditorState {
    grid: Grid;
    color: string;
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

export type EditorAction = PaintAction | ClearAction | SetColorAction;