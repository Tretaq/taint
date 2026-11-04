import {createContext, type Dispatch, type ReactNode, useReducer} from "react";
import type {EditorAction, EditorState} from "../types.ts";
import {editorReducer} from "./editorReducer.ts";
import {createGrid} from "../grid.ts";

export type EditorContextType = {
    state: EditorState;
    dispatch: Dispatch<EditorAction>;
} | null;

export const EditorContext = createContext<EditorContextType>(null);
// how it looks we define it at the start
interface EditorProviderProps {
    children: ReactNode;
}

export const EditorProvider = ({children}: EditorProviderProps) => {
    //hold the data and all
    const [state, dispatch] = useReducer(editorReducer, undefined, ():EditorState => ({
        grid: createGrid(16,16),
        color: "#000000"
    }));
    return (
        <EditorContext.Provider value={{state,dispatch}}>
                {children}
        </EditorContext.Provider>
    )
}