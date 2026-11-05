import type {Tool} from "../types.ts";

interface ToolbarProps {
    activeTool: Tool;
    onSelect: (tool: Tool) => void;
}
interface ToolConfig {
    id: Tool;
    label: string;
    icon?: string;

}
const TOOlS: ToolConfig[] = [
    {id: 'pencil',label: 'Pencil'},
    {id: 'eraser',label: 'Eraser'},
    {id: 'fill',label: 'Fill'},
    {id: 'eyedropper',label: 'Eyedropper'},


]
export const Toolbar: React.FC<ToolbarProps> = ({ activeTool, onSelect }) => {
    return (
        <div className="toolbar" role="toolbar" aria-labelledby={"Drawing tools"}>
            <div>Your Tool: {activeTool}</div>
            { TOOlS.map((tool) => {
                const isActive = activeTool === tool.id;
                return (
                    <button
                    key={tool.id}
                    type="button"
                    className={`toolbar-btn ${isActive ? 'active' : ''}`}
                    onClick={() => onSelect(tool.id)}
                    aria-pressed={isActive}
                    title={tool.label}
                    >
                        {tool.label}
                    </button>
                )
            })

            }

        </div>
    )
}