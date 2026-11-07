import './App.css'
import {PixelCanvas} from "./components/PixelCanvas.tsx";
import {useEditor} from "./state/useEditor.ts";
import {Palette} from "./components/Palette.tsx";
import {PALETTE} from "./palette.ts";
import {Toolbar} from "./components/Toolbar.tsx";
import {SizeSelect} from "./components/SizeSelect.tsx";
import {useState} from "react";

function App() {
    const {state,dispatch} = useEditor();
    const SIZES = [16,32,64]
   const MIN_ZOOM = 4;
    const MAX_ZOOM = 40;
    const [cellSize, setCellSize] = useState(20);
  const handleCellAction = (x: number, y: number, isStart: boolean) => {
      dispatch({type:"applyTool", x,y, isStart})
  }
  return (
    <>
      <PixelCanvas grid={state.grid} cellSize={cellSize}  onCellAction={handleCellAction} onStrokeEnd={() => dispatch({type: "endStroke"})}></PixelCanvas>
        <button onClick={() => {
            dispatch({type:"clear"})
        }}>Clear</button>
        <button disabled={state.past.length === 0} onClick={() => dispatch({type: "undo"})}>Undo</button>
        <button disabled={state.future.length === 0} onClick={() => dispatch({type: "redo"})}>Redo</button>
        <SizeSelect value={state.grid.length} options={SIZES} onChange={(size) => dispatch({type: "resize", width: size, height: size})}/>
        <div className="zoom-control">
            <label htmlFor="zoom">Zoom: {cellSize}px</label>
            <input id="zoom" type="range" min={MIN_ZOOM} max={MAX_ZOOM} value={cellSize} onChange={(e) => setCellSize(Number(e.target.value))}/>
        </div>
        <Palette recentColors={state.recentColors} selected={state.color} onSelected={(color) => dispatch({type: "setColor", color})} colors={PALETTE}></Palette>
        <Toolbar activeTool={state.tool} onSelect={(tool) => dispatch({type: 'setTool', tool})}/>
    </>
  )
}

export default App
