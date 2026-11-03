import type {EditorAction, EditorState} from "../types.ts";


export function editorReducer(state: EditorState, action: EditorAction):EditorState {
    switch(action.type){
        case "paint": {

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