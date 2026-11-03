import './App.css'
import {createGrid, setPixel} from "./grid.ts";
import {useState} from "react";
import {PixelCanvas} from "./components/PixelCanvas.tsx";

function App() {
    // const a = createGrid(4,4)
    // const b = setPixel(a,1,2, "red");
  // console.log(a[2][1], b[2][1], a === b)
  const [grid, setGrid] = useState(() => createGrid(16,16));
  return (
    <>
      <PixelCanvas grid={grid} cellSize={20}  onPaint={setGrid(prev => setPixel(prev,x,y,"#000000"))}></PixelCanvas>
    </>
  )
}

export default App
