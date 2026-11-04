import type {EditorAction, EditorState} from "../types.ts";
import {createGrid, getPixel, setPixel} from "../grid.ts";


export function editorReducer(state: EditorState, action: EditorAction):EditorState {
    switch(action.type){
        case "paint": {
            if(getPixel(state.grid,action.x,action.y) === state.color){
                return state;
            }
            const newgrid = setPixel(state.grid,action.x,action.y,state.color);
            return {...state,grid: newgrid};
        }
        case "clear": {
            const clearGrid = createGrid(state.grid[0].length,state.grid.length)
            return {...state,grid:clearGrid};
        }
        case "setColor": {
            if(state.color === action.color) return state;
            const filteredColors = state.recentColors.filter(c => c !== action.color);
            const updatedRecentColors = [action.color, ...filteredColors].slice(0, 8);
            return {...state,color: action.color,recentColors: updatedRecentColors};
        }
        default: {
            const _exhaustive: never = action;
            return state;
        }
    }
}