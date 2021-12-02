import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ColorContext } from "../contexts/ColorContext";
import { socket } from "../socket";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const { currentColor } = useContext(ColorContext)!;
  const [currentCoords, setCurrentCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (ctx) {
      socket.on("drawing", (infos: any) => {
        const w = canvasRef!.current!.width;
        const h = canvasRef!.current!.height;

        drawLine(
          infos.x * w,
          infos.y * h,
          infos.offsetX * w,
          infos.offsetY * h,
          infos.color,
          false
        );
      });
    }
  }, [ctx]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      // set width and height
      canvas.width = window.innerWidth / 1.2;
      canvas.height = window.innerHeight / 1.2;

      setCtx(canvas.getContext("2d"));
    }
  }, [canvasRef]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;

    const changeCanvasSize = () => {
      if (canvas) {
        canvas.width = window.innerWidth / 1.2;
        canvas.height = window.innerHeight / 1.2;
      }
    };

    window.addEventListener("resize", changeCanvasSize);

    return () => {
      window.removeEventListener("resize", changeCanvasSize);
    };
  }, [window]);

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
    drawLine(
      currentCoords.x,
      currentCoords.y,
      offsetX,
      offsetY,
      currentColor,
      true
    );
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const drawLine = (
    x: number,
    y: number,
    offsetX: number,
    offsetY: number,
    color: string,
    isMe?: boolean
  ) => {
    ctx!.beginPath();
    ctx!.moveTo(x, y);
    ctx!.lineTo(offsetX, offsetY);

    ctx!.lineCap = "round";
    ctx!.lineJoin = "round";

    ctx!.strokeStyle = color;

    ctx!.stroke();

    // if i am the person who is drawing
    if (isMe) {
      const w = canvasRef!.current!.width;
      const h = canvasRef!.current!.height;

      socket.emit("drawing", {
        x: x / w,
        y: y / h,
        offsetX: offsetX / w,
        offsetY: offsetY / h,
        color,
      });
    }
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
