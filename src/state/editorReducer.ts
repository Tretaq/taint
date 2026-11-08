import type {EditorAction, EditorState} from "../types.ts";
import {
    addRecentColor,
    createGrid,
    floodFill,
    getLinePoints,
    getPixel,
    getRectPoints,
    painCells,
    setPixel
} from "../grid.ts";

function withSnap(state: EditorState):EditorState {
    return {
        ...state,
        past: [...state.past, state.grid].slice(-100),
    };
}
export function editorReducer(state: EditorState, action: EditorAction):EditorState {
    switch(action.type){
        case "applyTool": {
            const { x , y ,isStart} = action;
            const base: EditorState = isStart ? {...withSnap(state), stroke: {startX: x, startY: y, lastX: x,lastY: y}} : state;

            switch (base.tool){
                case "pencil":{
                    if(getPixel(base.grid,action.x,action.y) === base.color){
                        return base;
                    }
                    const newgrid = setPixel(base.grid,action.x,action.y,base.color);
                    return {...base,grid: newgrid, recentColors: addRecentColor(base.recentColors,base.color)};
                }
                case "eraser": {
                    const newgrid = setPixel(base.grid,action.x,action.y,null);
                    return {...base,grid: newgrid}
                }
                case "fill": {
                    if(!action.isStart){
                        return base;
                    }
                    return {...base, grid: floodFill(base.grid,action.x,action.y,base.color),recentColors: addRecentColor(base.recentColors,base.color)};
                    
                }
                case "line":
                case "rect": {
                    const s = base.stroke;
                    if(!s) return base;
                    const origin = base.past[base.past.length-1];
                    const points = base.tool === "line" ? getLinePoints(s.startX,s.startY,action.x, action.y) : getRectPoints(s.startX, s.startY,action.x, action.y);
                    return {
                        ...base,
                        grid: painCells(origin, points, base.color),
                        recentColors: addRecentColor(base.recentColors,base.color),
                    }
                }
                case "eyedropper": {
                    if(!action.isStart){
                        return base;
                    }
                    const cellColor =getPixel(base.grid,action.x,action.y);
                    if( cellColor === null){
                        return base;
                    }
                    return {...base,color: cellColor}
                }
                default: {
                    const _exhaustive: never = base.tool;
                    return base;
                }
            }

        }
        case "clear": {
            return {
                ...withSnap(state),
                grid: createGrid(state.grid[0].length, state.grid.length),
                future: []
            }
        }
        case  "loadGrid": {
            return {
                ...withSnap(state),
                grid: action.grid,
                future: [],
                stroke: null
            }
        }
        case "setColor": {
            if(state.color === action.color) return state;

            return {...state,color: action.color};
        }
        case "setTool": {
            return {...state, tool: action.tool}
        }
        case "endStroke": {
            if(state.grid === state.past[state.past.length-1]  ){
                return {...state, past:state.past.slice(0,-1)};
            }
            return {...state,future:[]}
        }
        case "undo": {
         if(state.past.length === 0){
             return state;
         }
         return {
             ...state,grid: state.past[state.past.length-1],past:state.past.slice(0,-1),future: [state.grid, ...state.future],
         }
        }
        case "resize": {
            const currentHeight = state.grid.length;
            const currentWidth = state.grid[0].length;
            if(action.width === currentWidth && action.height === currentHeight){
                return state;
            }
            return {
                ...withSnap(state),
                grid: createGrid(action.width,action.height),
            }
        }
        case "redo": {
            if(state.future.length === 0){{
                return state;
            }}
            const [next, ...rest] = state.future
            return {
                ...state,
                grid: next,
                past: [...state.past, state.grid],
                future: rest,
            }
        }
        default: {
            const _exhaustive: never = action;
            return state;
        }
    }
}