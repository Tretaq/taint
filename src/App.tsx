import './App.css'
import {createGrid, setPixel} from "./grid.ts";
import {useState} from "react";
import {PixelCanvas} from "./components/PixelCanvas.tsx";
import {useEditor} from "./state/useEditor.ts";

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
    </>
  )
}

export default App
