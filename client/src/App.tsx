import React from "react";
import Canvas from "./components/Canvas";
import ColorPad from "./components/ColorPad";

const App = () => {
  return (
    <div className="app w-screen h-screen overflow-hidden bg-blue-50 flex flex-col items-center justify-center relative">
      <Canvas />
      <ColorPad />
    </div>
  );
};

export default App;
