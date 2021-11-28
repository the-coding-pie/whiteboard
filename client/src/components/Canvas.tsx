import React, { useContext, useEffect, useRef, useState } from "react";
import { ColorContext } from "../contexts/ColorContext";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const { currentColor } = useContext(ColorContext)!;

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      // set width and height
      canvas.width = window.innerWidth / 1.6;
      canvas.height = 400;

      setCtx(canvas.getContext("2d"));
    }
  }, [canvasRef]);

  const startDraw = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const { offsetX, offsetY } = nativeEvent;

    setIsDrawing(true);

    ctx!.beginPath();
    ctx!.moveTo(offsetX, offsetY);
    ctx!.lineCap = "round";
    ctx!.lineJoin = "round";
    // set color
    ctx!.strokeStyle = currentColor;
  };

  const endDraw = () => {
    setIsDrawing(false);
  };

  const draw = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;

    ctx!.lineTo(offsetX, offsetY);
    ctx!.stroke();
  };

  return (
    <canvas
      id="canvas"
      className="canvas bg-white shadow rounded"
      ref={canvasRef}
      onMouseMove={draw}
      onMouseDown={startDraw}
      onMouseUp={endDraw}
    ></canvas>
  );
};

export default Canvas;
