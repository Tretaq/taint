import type {Grid} from "../types.ts";
import React, {useRef, useState} from "react";
import {parseProject, serializeProject} from "../storage.ts";
import {downloadBlob} from "../export.ts";

interface FileActionsProps {
    grid: Grid;
    onload: (grid: Grid) => void;
}

export const FileActions: React.FC<FileActionsProps> = ({grid, onload}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);
    const handleSave = () => {
        const blob = new Blob([serializeProject(grid)], { type: "application/json" });
        downloadBlob(blob,"pixel-art.json")
    }
    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target;
        const file = input.files?.[0];
        if(!file) return;
        try{
            const text = await file.text();
            onload(parseProject(text));
            setError(null);
        } catch (err){
            setError(err instanceof Error ? err.message : "Coud not load the file.");
        } finally {
            input.value = "";
        }
    }
    return (
        <div className="file-actions">
            <button type={"button"} onClick={handleSave}>Save project</button>
            <button type={"button"}  onClick={() => inputRef.current?.click()}>Load project</button>
            <input ref={inputRef} onChange={handleFile} type="file" accept="application/json,.json" hidden />
            {error && <p className="error">{error}</p>}
        </div>
    )
}