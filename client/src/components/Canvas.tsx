import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ColorContext } from "../contexts/ColorContext";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const { currentColor } = useContext(ColorContext)!;
  const [currentCoords, setCurrentCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      // set width and height
      canvas.width = window.innerWidth / 1.2;
      canvas.height = window.innerHeight / 1.2;

      setCtx(canvas.getContext("2d"));
    }
  }, [canvasRef]);

  const handleMouseDown = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setIsDrawing(true);

    const { offsetX, offsetY } = nativeEvent;

    // starting coordinates
    setCurrentCoords({ x: offsetX, y: offsetY });
  };

  const handleMouseMove = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isDrawing) {
      return;
    }

    const { offsetX, offsetY } = nativeEvent;

    setCurrentCoords({ x: offsetX, y: offsetY });
    drawLine(offsetX, offsetY);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const drawLine = (offsetX: number, offsetY: number) => {
    ctx!.beginPath();
    ctx!.moveTo(currentCoords.x, currentCoords.y);
    ctx!.lineTo(offsetX, offsetY);

    ctx!.lineCap = "round";
    ctx!.lineJoin = "round";

    ctx!.strokeStyle = currentColor;

    ctx!.stroke();
  };

  return (
    <canvas
      id="canvas"
      className="canvas bg-white shadow rounded"
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    ></canvas>
  );
};

export default Canvas;
