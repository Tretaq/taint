import type {EditorAction, EditorState} from "../types.ts";
import {createGrid, floodFill, getPixel, setPixel} from "../grid.ts";


export function editorReducer(state: EditorState, action: EditorAction):EditorState {
    switch(action.type){
        case "applyTool": {
            switch (state.tool){
                case "pencil":{
                    if(getPixel(state.grid,action.x,action.y) === state.color){
                        return state;
                    }
                    const newgrid = setPixel(state.grid,action.x,action.y,state.color);
                    let updatedRecentColors = state.recentColors
                    if(state.recentColors && state.recentColors[0] != state.color){
                        const filteredColors = state.recentColors.filter(c => c !== state.color);
                        updatedRecentColors = [state.color, ...filteredColors].slice(0, 8);
                    }
                    return {...state,grid: newgrid, recentColors: updatedRecentColors};
                }
                case "eraser": {
                    const newgrid = setPixel(state.grid,action.x,action.y,null);
                    return {...state,grid: newgrid}
                }
                case "fill": {
                    if(!action.isStart){
                        return state;
                    }
                    let updatedRecentColors = state.recentColors
                    if(state.recentColors && state.recentColors[0] != state.color){
                        const filteredColors = state.recentColors.filter(c => c !== state.color);
                        updatedRecentColors = [state.color, ...filteredColors].slice(0, 8);
                    }
                    return {...state, grid: floodFill(state.grid,action.x,action.y,state.color),recentColors: updatedRecentColors};
                    
                }
                case "eyedropper": {
                    if(!action.isStart){
                        return state;
                    }
                    const cellColor =getPixel(state.grid,action.x,action.y);
                    if( cellColor === null){
                        return state;
                    }
                    return {...state,color: cellColor,tool: "pencil"}
                }
                default: {
                    const _exhaustive: never = state.tool;
                    return state;

                }
            }

        }
        case "clear": {
            const clearGrid = createGrid(state.grid[0].length,state.grid.length)
            return {...state,grid:clearGrid};
        }
        case "setColor": {
            if(state.color === action.color) return state;

            return {...state,color: action.color};
        }
        case "setTool": {
            return {...state, tool: action.tool}
        }
        default: {
            const _exhaustive: never = action;
            return state;
        }
    }
}