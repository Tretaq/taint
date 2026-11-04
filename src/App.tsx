import './App.css'
import {PixelCanvas} from "./components/PixelCanvas.tsx";
import {useEditor} from "./state/useEditor.ts";
import {Palette} from "./components/Palette.tsx";
import {PALETTE} from "./palette.ts";

function App() {

    const {state,dispatch} = useEditor();

  const handlePaint = (x: number, y: number) => {
      dispatch({type:"paint", x,y})
  }
  return (
    <>
      <PixelCanvas grid={state.grid} cellSize={20}  onPaint={handlePaint}></PixelCanvas>
        <button onClick={() => {
            dispatch({type:"clear"})
        }}>Clear</button>
        <Palette recentColors={state.recentColors} selected={state.color} onSelected={(color) => dispatch({type: "setColor", color})} colors={PALETTE}></Palette>

    </>
  )
}

export default App
