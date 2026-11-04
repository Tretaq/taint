import React from 'react';
interface PaletteProps {
    colors: string[];
    selected: string;
    onSelected: (color: string) => void;
}
export const Palette: React.FC<PaletteProps> = ({colors, selected, onSelected}) => {
    return (
        <div className="palette-container" >
            <h3>Color Palette</h3>

            <div className="palette-grid">
                {colors.map((color) => (
                    <button
                        aria-label={color}
                        title={color}
                    key={color}
                    className="palette-color-btn"
                    style= {{backgroundColor: color}}
                    aria-pressed={selected === color}
                    onClick={() => onSelected(color)}
                    />
                ))}
            </div>
            <div className="custom-color-picker">
                <label htmlFor="custom-color">Pick a color:</label>
                <input id="custom-color" type="color" value={selected} onChange={(e) => onSelected(e.target.value)} />
            </div>

        </div>
    )
}