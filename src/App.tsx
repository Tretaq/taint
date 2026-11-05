import './App.css'
import {PixelCanvas} from "./components/PixelCanvas.tsx";
import {useEditor} from "./state/useEditor.ts";
import {Palette} from "./components/Palette.tsx";
import {PALETTE} from "./palette.ts";
import {Toolbar} from "./components/Toolbar.tsx";

function App() {

    const {state,dispatch} = useEditor();

  const handleCellAction = (x: number, y: number, isStart: boolean) => {
      dispatch({type:"applyTool", x,y, isStart})
  }
  return (
    <>
      <PixelCanvas grid={state.grid} cellSize={20}  onCellAction={handleCellAction}></PixelCanvas>
        <button onClick={() => {
            dispatch({type:"clear"})
        }}>Clear</button>
        <Palette recentColors={state.recentColors} selected={state.color} onSelected={(color) => dispatch({type: "setColor", color})} colors={PALETTE}></Palette>
        <Toolbar activeTool={state.tool} onSelect={(tool) => dispatch({type: 'setTool', tool})}/>
    </>
  )
}

export default App
