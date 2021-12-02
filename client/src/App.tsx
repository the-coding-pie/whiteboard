import React, { useEffect } from "react";
import Canvas from "./components/Canvas";
import ColorPad from "./components/ColorPad";
import { socket } from "./socket";

const App = () => {
  // on every render, if socket instance changes, execute the effects it holds
  useEffect(() => {
    // connect manually
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div className="app w-screen h-screen overflow-hidden bg-blue-50 flex flex-col items-center justify-center relative">
      <Canvas />
      <ColorPad />
    </div>
  );
};

export default App;
