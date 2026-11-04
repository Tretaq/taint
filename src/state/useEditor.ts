import {useContext} from "react";
import {EditorContext} from "./EditorContext.tsx";

export function useEditor(){
    const value = useContext(EditorContext);
    if(!value) throw new Error('useEditor must be used within context');
    return value;
}