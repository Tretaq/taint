import type {Grid} from "../types.ts";

interface SizeSelectProps {
    value: number;
    options: number[];
    onChange: (size: number) => void;
}
export const SizeSelect: React.FC<SizeSelectProps> = ({value, options, onChange}) => {
    return (
        <div className="size-select">
            <label htmlFor="canvas-size">Canvas size</label>
            <select id="canvas-size" value={value} onChange={(e) => onChange(Number(e.target.value))}>
                {
                    options.map((size) => (
                        <option key={size} value={size}>
                            {size} x {size}
                        </option>
                    ))}
            </select>
        </div>
    )
}