import type {Grid} from "../types.ts";
import {useRef, useState} from "react";
import {serializeProject} from "../storage.ts";
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
    const handleFile = (error: Error) => {

    }
}