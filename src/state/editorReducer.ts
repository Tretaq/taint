import type {EditorAction, EditorState} from "../types.ts";
import {getPixel, setPixel} from "../grid.ts";


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

        }
        case "setColor": {

        }
        default: {
            const _exhaustive: never = action;
            return state;
        }
    }
}